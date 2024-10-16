import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchCollection() {
  try {
    const ownedCards = await prisma.card.findMany();

    return {
      ownedCards,
    };
  } catch (error) {
    console.error('Hiba történt az adatok lekérése közben:', error);
    throw new Error('Failed to fetch cards from the database.');
  } finally {
    await prisma.$disconnect();
  }
}
