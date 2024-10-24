import React from 'react';
import BoardComponent, { BoardProps } from '@/app/board/board.component';
import { fetchBoardData } from '@/app/board/board.fetcher';
import { prisma } from '../../../prisma';

export default async function Page() {
  const data: BoardProps = (await fetchBoardData()) as BoardProps;

  const stream = await prisma.battle.stream({ name: 'battle-stream' });

  for await (const event of stream) {
    console.log('New event:', event);
  }

  return <BoardComponent {...data} />;
}
