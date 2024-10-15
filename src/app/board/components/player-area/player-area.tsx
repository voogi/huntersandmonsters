'use client';
import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { DraggableCardItem } from '@/app/components/draggable-card-item';

export default function PlayerArea({ cards }: { cards: any }) {
  return (
    <div
      className={
        'bg-stone-600 flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md gap-3'
      }
    >
      <div className={'flex flex-row'}>
        <div className={'grid grid-cols-4 gap-2 w-2/3 mx-auto mt-10'}>
          <SortableContext id="playerCardsSortable" items={cards}>
            {cards?.map((id: any) => <DraggableCardItem key={id} id={id} />)}
          </SortableContext>
        </div>
      </div>
      <div>resource 5/5</div>
    </div>
  );
}