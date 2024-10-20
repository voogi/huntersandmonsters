'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';

export async function addDeck(playerId: number, name: string) {
  const response: any = await prisma.player_Decks.create({
    data: {
      name,
      playerId,
    },
  });
  revalidatePath('/collection');
  return response;
}

export async function removeDeck(deckId: number) {
  const response: any = await prisma.player_Decks.delete({
    where: {
      id: deckId,
    },
  });
  revalidatePath('/collection');
  return response;
}

export async function updateEditedDeckId(playerId: number, newDeckId: number) {
  const updatedPlayer = await prisma.player.update({
    where: { id: playerId },
    data: { editedDeckId: newDeckId },
  });
  revalidatePath('/collection');
  return updatedPlayer;
}

export async function addCardToDeck(deckId: number, cardId: number, quantity: number) {
  try {
    const deckCard = await prisma.deck_Card.create({
      data: {
        deckId: deckId,
        cardId: cardId,
        quantity: quantity,
      },
    });
    revalidatePath('/collection');
    return deckCard;
  } catch (error) {
    console.error('Error adding card to deck:', error);
  }
}

export async function removeCardFromDeck(deckId: number, cardId: number) {
  try {
    const deletedCard = await prisma.deck_Card.deleteMany({
      where: {
        deckId: deckId,
        cardId: cardId,
      },
    });
    revalidatePath('/collection');
    return deletedCard;
  } catch (error) {
    console.error('Error adding card to deck:', error);
  }
}
