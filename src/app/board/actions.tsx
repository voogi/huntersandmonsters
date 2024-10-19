'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';
import { Card } from '@prisma/client';

export async function saveState(battleId: number, playerCards: Card[], boardCards: Card[]) {
  const response: any = await prisma.battle.upsert({
    create: {
      id: battleId,
      state: {
        playerCards,
        boardCards,
      },
    },
    update: {
      state: {
        playerCards,
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
