import { Card, Player, Prisma } from '@prisma/client';
import { prisma } from '../../../prisma';

export type PlayerDeckWithCards = Prisma.Player_DecksGetPayload<{
  include: {
    cards: {
      include: {
        card: true;
      };
    };
  };
}>;

export type DeckCardWithCard = Prisma.Deck_CardGetPayload<{
  include: {
    card: true;
  };
}>;

export async function fetchCollection() {
  try {
    const ownedCards: Card[] = await prisma.card.findMany();
    const player: Player | null = await prisma.player.findFirst();
    const playerDecks: PlayerDeckWithCards[] = await prisma.player_Decks.findMany({
      where: { playerId: player?.id },
      include: {
        cards: {
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
