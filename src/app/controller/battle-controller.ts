'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';
import { generateCards } from '@/utils';
import { Card } from '@prisma/client';

export async function startBattle() {
  const response: any = await prisma.battle.upsert({
    create: {
      id: 1,
      privateP1Data: {
        cards: generateCards(4),
        deck: generateCards(20),
      },
      state: {
        boardCards: [],
      },
    },
    update: {
      privateP1Data: {
        cards: generateCards(4),
        deck: generateCards(20),
      },
      state: {
        boardCards: [],
      },
    },
    where: {
      id: 1,
    },
  });
  revalidatePath('/board');
  return response;
}

export async function drawCard(playerId: number) {
  const battle = await prisma.battle.findFirst({
    where: {
      players: {
        some: { id: playerId },
      },
    },
  });

  if (!battle) {
    throw new Error('Battle not found for this player.');
  }

  const privateP1Data = battle.privateP1Data as {
    deck: Card[];
    cards: Card[];
  };

  if (!privateP1Data?.deck || privateP1Data.deck.length === 0) {
    throw new Error('No cards in the deck');
  }

  const drawnCard = privateP1Data.deck.shift();

  if (!drawnCard) {
    throw new Error('No drawn card!');
  }

  privateP1Data.cards.push(drawnCard);

  await prisma.battle.update({
    where: { id: battle.id },
    data: {
      privateP1Data: privateP1Data,
    },
  });

  revalidatePath('/board');
  return drawnCard;
}
