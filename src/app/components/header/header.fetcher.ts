import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchHeader() {
  try {
    const player: any = await prisma.player.findFirst();

    return {
      player
    };
  } catch (error) {
    console.error('Hiba történt az adatok lekérése közben:', error);
    throw new Error('Failed to fetch cards from the database.');
  } finally {
    await prisma.$disconnect();
  }
}
