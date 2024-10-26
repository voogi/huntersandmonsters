'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';
import { generateCards, moveInArray } from '@/utils';
import { Card } from '@prisma/client';
import { BattleState, PrivateData } from '@/app/models';
import { getPlayerId } from '@/app/controller/user-controller';

export async function startBattle() {
  const response: any = await prisma.battle.upsert({
    create: {
      id: 1,
      privateP1Data: {
        cards: generateCards(4, '/hunter.png'),
        deck: generateCards(20, '/hunter.png'),
      },
      privateP2Data: {
        cards: generateCards(4, '/wolf.webp'),
        deck: generateCards(20, '/back.png'),
      },
      state: {
        boardCards: [],
        opponentBoardCards: generateCards(2),
      },
    },
    update: {
      privateP1Data: {
        cards: generateCards(4, '/hunter.png'),
        deck: generateCards(20, '/hunter.png'),
      },
      privateP2Data: {
        cards: generateCards(4, '/wolf.webp'),
        deck: generateCards(20, '/back.png'),
      },
      state: {
        boardCards: [],
        opponentBoardCards: generateCards(2),
      },
    },
    where: {
      id: 1,
    },
  });
  revalidatePath('/board');
  return response;
}

export async function drawCard() {
  const battle = await getBattle();
  const playerId = await getPlayerId();
  const isUserP1 = battle?.players[0].id === playerId;

  const privateData = (isUserP1 ? battle.privateP1Data : battle.privateP2Data) as unknown as PrivateData;

  if (!privateData?.deck || privateData.deck.length === 0) {
    throw new Error('No cards in the deck');
  }

  const drawnCard = privateData.deck.shift();

  if (!drawnCard) {
    throw new Error('No drawn card!');
  }

  privateData.cards.push(drawnCard);

  const userDataKey = isUserP1 ? 'privateP1Data' : 'privateP2Data';

  await prisma.battle.update({
    where: { id: battle.id },
    data: {
      [userDataKey]: privateData,
    },
  });

  revalidatePath('/board');
  return drawnCard;
}

export async function attackCard(cardId: number, targetCardId: number) {
  const battle = await getBattle();
  const playerId = await getPlayerId();
  const isUserP1 = battle?.players[0].id === playerId;
  const state: BattleState = battle.state as unknown as BattleState;

  const cards = isUserP1 ? state.boardCards : state.opponentBoardCards;
  const opponentCards = isUserP1 ? state.opponentBoardCards : state.boardCards;

  const card = cards.find((card) => card.id === cardId);
  if (!card) {
    throw new Error(`Card ${cardId} not found on the battlefield`);
  }

  const opponentCard = opponentCards.find((card) => card.id === targetCardId);
  if (!opponentCard) {
    throw new Error(`Card ${cardId} not found on the battlefield`);
  }

  opponentCard.health -= card.attack;
  if(opponentCard.health <= 0) {
    opponentCards.splice(opponentCards.indexOf(opponentCard), 1);
  }

  const cardsKey = isUserP1 ? 'boardCards' : 'opponentBoardCards';
  const opponentCardsKey = isUserP1 ? 'opponentBoardCards' : 'boardCards';
  await prisma.battle.update({
    where: { id: battle.id },
    data: {
      state: {
        ...state,
        [cardsKey]: cards,
        [opponentCardsKey]: opponentCards,
      },
    },
  });

  revalidatePath('/board');
}


export async function changeCardPositionOnTheBattlefield(cardId: number, newIndex: number) {
  const battle = await getBattle();
  const playerId = await getPlayerId();
  const isUserP1 = battle?.players[0].id === playerId;
  const state: BattleState = battle.state as unknown as BattleState;

  const cards = isUserP1 ? state.boardCards : state.opponentBoardCards;

  const cardIdx = cards.findIndex((card) => card.id === cardId);
  if (cardIdx === -1) {
    throw new Error(`Card ${cardId} not found on the battlefield`);
  }

  moveInArray(cards, cardIdx, newIndex);

  const cardsKey = isUserP1 ? 'boardCards' : 'opponentBoardCards';
  await prisma.battle.update({
    where: { id: battle.id },
    data: {
      state: {
        ...state,
        [cardsKey]: cards,
      },
    },
  });

  await prisma.event.create({
    data: {
      battleId: battle.id,
      playerId,
      battleEvent: 'REORDER_BOARD',
      eventData: {
        cardId,
        oldIndex: cardIdx,
        newIndex
      }
    }
  })

  revalidatePath('/board');
}

export async function moveCardToBattlefield(cardId: number, newIndex: number) {
  const battle = await getBattle();
  const playerId = await getPlayerId();
  const isUserP1 = battle?.players[0].id === playerId;

  const privateData = (isUserP1 ? battle.privateP1Data : battle.privateP2Data) as unknown as PrivateData;

  if (!privateData?.cards || privateData.cards.length === 0) {
    throw new Error("No cards in the player's hand");
  }

  const cardIdx = privateData.cards.findIndex((card) => card.id === cardId);
  if (cardIdx === -1) {
    throw new Error(`Card ${cardId} not found in the player\'s hand`);
  }

  const card: Card = privateData.cards.splice(cardIdx, 1)[0];

  const state: BattleState = battle.state as unknown as BattleState;

  if (isUserP1) {
    state.boardCards.splice(newIndex, 0, card);
  } else {
    state.opponentBoardCards.splice(newIndex, 0, card);
  }

  const userDataKey = isUserP1 ? 'privateP1Data' : 'privateP2Data';
  const cardsKey = isUserP1 ? 'boardCards' : 'opponentBoardCards';
  const cardsData = isUserP1 ? state.boardCards : state.opponentBoardCards;

  await prisma.battle.update({
    where: { id: battle.id },
    data: {
      [userDataKey]: privateData,
      state: {
        ...state,
        [cardsKey]: cardsData,
      },
    },
  });

  await prisma.event.create({
    data: {
      battleId: battle.id,
      playerId,
      battleEvent: 'PLAY_CARD',
      eventData: {
        card,
        oldIndex: cardIdx,
        newIndex
      }
    }
  })

  revalidatePath('/board');
}

async function getBattle() {
  const playerId = await getPlayerId();
  const battle = await prisma.battle.findFirst({
    where: {
      players: {
        some: { id: playerId },
      },
    },
    include: {
      players: true,
    },
  });

  if (!battle) {
    throw new Error('Battle not found for this player.');
  }

  return battle;
}
