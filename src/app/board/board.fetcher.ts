import { generateRandomCode } from '@/utils';

export async function fetchBoardData() {
/*  const response = await fetch('https://api.example.com/users');

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;*/

  return {
    boardCards: [...Array(2).keys()].map(() => generateRandomCode()),
    playerCards: [...Array(2).keys()].map(() => generateRandomCode())
  }

}
