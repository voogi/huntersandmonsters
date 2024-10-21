'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';
import { generateCards } from '@/utils';

export async function startBattle() {
  const response: any = await prisma.battle.upsert({
    create: {
      id: 1,
      privateP1Data: {
        cards: generateCards(4),
      },
      state: {
        boardCards: [],
      },
    },
    update: {
      privateP1Data: {
        cards: generateCards(4),
      },
      state: {
        boardCards: [],
      },
    },
    where: {
      id: 1,
    },
  });
  console.log(response);
  revalidatePath('/board');
  return response;
}
