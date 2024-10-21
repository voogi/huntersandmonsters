'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';
import { Card } from '@prisma/client';

export async function saveState(battleId: number, playerCards: Card[], boardCards: Card[]) {
  const response: any = await prisma.battle.upsert({
    create: {
      id: battleId,
      privateP1Data: {
        cards: playerCards
      },
      state: {
        boardCards,
      },
    },
    update: {
      privateP1Data: {
        cards: playerCards
      },
      state: {
        boardCards,
      },
    },
    where: {
      id: battleId
    }
  });
  revalidatePath('/board');
  return response;
}
