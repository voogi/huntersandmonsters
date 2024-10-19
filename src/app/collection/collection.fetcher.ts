import { Card } from '@prisma/client';
import { prisma } from '../../../prisma';

export async function fetchCollection() {
  try {
    const ownedCards: Card[] = await prisma.card.findMany();
    const player: any = await prisma.player.findFirst();
    const playerDecks: any = await prisma.player_Decks.findMany({
      where: { playerId: player.id },
      include: {
        deckCards: {
          include: {
            card: true,
          },
        },
      },
    });
    return {
      ownedCards,
      player,
      playerDecks,
    };
  } catch (error) {
    console.error('Hiba történt az adatok lekérése közben:', error);
    throw new Error('Failed to fetch cards from the database.');
  } finally {
    await prisma.$disconnect();
  }
}
