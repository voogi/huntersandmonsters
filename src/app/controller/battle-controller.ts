'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';
import { generateCards } from '@/utils';

export async function startBattle() {
  const response: any = await prisma.battle.upsert({
    create: {
      id: 1,
      state: {
        playerCards: generateCards(4),
        boardCards: [],
      },
    },
    update: {
      state: {
        playerCards: generateCards(4),
        boardCards: [],
      },
    },
    where: {
      id: 1,
    },
  });
  revalidatePath('/board');
  return response;
}
