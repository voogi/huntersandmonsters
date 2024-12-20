import { Card, Prisma } from '@prisma/client';
import { Event } from '@prisma/client';
import { prisma } from '../../../prisma';
import { getPlayerId } from '@/app/controller/user-controller';

export type PlayerWithResources = Prisma.PlayerGetPayload<{
  include: {
    resources: true;
  };
}>;

export async function fetchBoardData() {
  try {
    const battle: any = await prisma.battle.findUnique({
      where: {
        id: 1,
      },
      include: {
        players: true,
      },
    });
    const playerId = await getPlayerId();

    const player: PlayerWithResources | null = await prisma.player.findUnique({
      where: {
        id: playerId
      },
      include: {
        resources: true,
      },
    });

    const events: Event[] = await prisma.event.findMany({
      where: {
        battleId: battle.id
      }
    })

    const state: any = typeof battle?.state === 'object' && battle.state !== null ? battle.state : {};
    const privateP1Data: any =
      typeof battle?.privateP1Data === 'object' && battle.privateP1Data !== null ? battle.privateP1Data : {};

    const privateP2Data: any =
      typeof battle?.privateP2Data === 'object' && battle.privateP2Data !== null ? battle.privateP2Data : {};

    const isUserP1 = battle?.players[0].id === playerId;

    return {
      boardCards: isUserP1 ? state.boardCards : state.opponentBoardCards,
      opponentBoardCards: isUserP1 ? state.opponentBoardCards : state.boardCards,
      player,
      pCards: isUserP1 ? privateP1Data.cards : privateP2Data.cards,
      oCards: !isUserP1 ? privateP1Data.cards?.map((c: Card) => c.id) : privateP2Data.cards?.map((c: Card) => c.id),
      pDeckSize: isUserP1 ? privateP1Data.deck?.length : privateP2Data.deck?.length,
      oDeckSize: !isUserP1 ? privateP1Data.deck?.length : privateP2Data.deck?.length,
      events,
      phase: battle.phase
    };
  } catch (error) {
    console.error('Hiba történt az adatok lekérése közben:', error);
  } finally {
    await prisma.$disconnect();
  }
}
