import React from 'react';
import BoardComponent, { BoardProps } from '@/app/board/board.component';
import { fetchBoardData } from '@/app/board/board.fetcher';

export default async function Page() {
  const data: BoardProps = await fetchBoardData() as BoardProps;
  return (
    <BoardComponent {...data} />
  );
}
