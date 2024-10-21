import { Battle, Prisma } from '@prisma/client';
import { prisma } from '../../../prisma';
import { generateRandomCode } from '@/utils';

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

    return {
      ...state,
      player,
    };
  } catch (error) {
    console.error('Hiba történt az adatok lekérése közben:', error);
    return {
      boardCards: [...Array(2).keys()].map(() => generateRandomCode()),
      playerCards: [...Array(2).keys()].map(() => generateRandomCode()),
    };
  } finally {
    await prisma.$disconnect();
  }
}
