'use client';
import React from 'react';
import { DraggableCardItem } from '@/app/components/draggable-card-item';
import { useDroppable } from '@dnd-kit/core';
import { Card } from '@prisma/client';
import { SortableContext } from '@dnd-kit/sortable';
import { PlayerType } from '@/app/models';

export const BATTLE_AREA_ID: string = 'boardCards';

export default function BattleArea({
  cards,
  onClick,
  selectedCards,
}: {
  cards: Card[];
  onClick: any;
  selectedCards: any;
}) {
  const { setNodeRef } = useDroppable({
    id: BATTLE_AREA_ID,
  });
  return (
    <SortableContext items={cards} id={BATTLE_AREA_ID}>
      <div ref={setNodeRef} className={'flex flex-row gap-4 min-h-20 h-full w-full justify-center items-center'}>
        {cards?.map((card: Card) => (
          <DraggableCardItem
            selectedCards={selectedCards}
            type={PlayerType.PLAYER}
            onClick={onClick}
            disable={true}
            key={card.id}
            card={card}
          />
        ))}
      </div>
    </SortableContext>
  );
}
