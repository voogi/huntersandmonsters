'use client';
import React from 'react';
import { DraggableCardItem } from '@/app/components/draggable-card-item';
import { useDroppable } from '@dnd-kit/core';

export default function PlayerArea({ cards }: { cards: any }) {
  const { setNodeRef } = useDroppable({
    id: 'playerArea',
  });
  return (
    <div
      className={
        'bg-stone-600 flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md gap-3'
      }
    >
      <div ref={setNodeRef} className={'flex flex-row min-h-72 w-full justify-center items-center'}>
        {cards?.map((id: any) => <DraggableCardItem key={id} id={id} />)}
      </div>
    </div>
  );
}

