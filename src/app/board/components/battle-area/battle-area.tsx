'use client';
import React from 'react';
import { DraggableCardItem } from '@/app/components/draggable-card-item';
import { useDroppable } from '@dnd-kit/core';
import { Card } from '@prisma/client';
import { SortableContext } from '@dnd-kit/sortable';

const BATTLE_AREA_ID: string = 'boardCards';

export default function BattleArea({ cards }: { cards: Card[] }) {
  const { setNodeRef } = useDroppable({
    id: BATTLE_AREA_ID,
  });
  return (
    <div
      className={
        'bg-stone-700 flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md'
      }
    >
      <SortableContext items={cards} id={BATTLE_AREA_ID}>
        <div ref={setNodeRef} className={'flex flex-row gap-4 min-h-72 w-full justify-center items-center'}>
          {cards?.map((card: Card) => <DraggableCardItem key={card.id} card={card} />)}
        </div>
      </SortableContext>
    </div>
  );
}
