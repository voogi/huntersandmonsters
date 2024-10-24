'use server';
import { prisma } from '../../../prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

let battleStream;

export async function getStreams() {
  if(!battleStream) {
    battleStream = await prisma.battle.stream({
      update: {
        id: { eq: 1 },
      },
    });
  }


  for await (const event of battleStream) {
    console.log('New event:', event);
    // revalidatePath('/board');
    revalidatePath('/', 'layout')
  }

}