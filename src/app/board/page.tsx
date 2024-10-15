import React from 'react';
import BoardComponent from '@/app/board/board.component';
import { fetchBoardData } from '@/app/board/board.fetcher';

export default async function Page() {
  const data = await fetchBoardData();
  return (
    <BoardComponent data={data}/>
  );
}
