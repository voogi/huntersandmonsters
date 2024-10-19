import { Battle } from '@prisma/client';
import { prisma } from '../../../prisma';

export async function fetchBoardData() {
  try {
    const battle: Battle = await prisma.battle.findUnique({
      where: {
        id: 1,
      },
    });
    return {
      ...battle.state
    };
  } catch (error) {
    console.error('Hiba történt az adatok lekérése közben:', error);
    throw new Error('Failed to fetch cards from the database.');
  } finally {
    await prisma.$disconnect();
  }

}
