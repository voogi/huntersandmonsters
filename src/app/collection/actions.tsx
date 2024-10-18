'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';

export async function addDeck(playerId: number, deckName: string) {
  console.log(playerId);
  const response: any = await prisma.player_Decks.create({
    data: {
      deckName: deckName,
      playerId: playerId,
    },
  });
  revalidatePath('/collection');
  return response;
}
