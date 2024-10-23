'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function changePlayer(playerId: string) {
  const cookieStore = await cookies();
  cookieStore.set('ham.user', playerId)
  revalidatePath("/")
}

export async function getPlayerId() {
  const cookieStore = await cookies();
  const currentUser = cookieStore.get('ham.user');
  return currentUser && currentUser.value ? Number(currentUser.value) : 1;
}