'use client';
import React from 'react';
import { DraggableCardItem } from '@/app/components/draggable-card-item';

export default function OpponentArea({ cards }: { cards: any }) {
  return (
    <div
      className={
        'bg-stone-800 content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md flex-grow gap-3'
      }
    >
      <div>resource 5/5</div>
      <div className={'flex flex-row'}>
        <div className={'grid grid-cols-4 gap-2 w-2/3 mx-auto mt-10'}>
          {/*{cards?.map((id: any) => <DraggableCardItem key={id} id={id} />)}*/}
        </div>
      </div>
    </div>
  );
}
