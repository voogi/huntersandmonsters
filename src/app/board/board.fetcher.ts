import { Battle, Prisma } from '@prisma/client';
import { prisma } from '../../../prisma';

export type PlayerWithResources = Prisma.PlayerGetPayload<{
  include: {
    resources: true;
  };
}>;

export async function fetchBoardData() {
  try {
    const battle: Battle | null = await prisma.battle.findUnique({
      where: {
        id: 1,
      },
    });

    const player: PlayerWithResources | null = await prisma.player.findFirst({
      include: {
        resources: true,
      },
    });

    const state = typeof battle?.state === 'object' && battle.state !== null ? battle.state : {};
    const privateP1Data: any =
      typeof battle?.privateP1Data === 'object' && battle.privateP1Data !== null ? battle.privateP1Data : {};

    console.log(privateP1Data.cards.length);

    return {
      ...state,
      player,
      pCards: privateP1Data.cards,
      pDeck: privateP1Data.deck,
    };
  } catch (error) {
    console.error('Hiba történt az adatok lekérése közben:', error);
  } finally {
    await prisma.$disconnect();
  }
}
