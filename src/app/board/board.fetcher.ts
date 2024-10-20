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

    return {
      ...state,
      player,
    };
  } catch (error) {
    console.error('Hiba történt az adatok lekérése közben:', error);
    throw new Error('Failed to fetch cards from the database.');
  } finally {
    await prisma.$disconnect();
  }
}
