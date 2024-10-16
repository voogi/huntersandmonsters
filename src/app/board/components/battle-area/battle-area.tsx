'use client';
import React from 'react';
import { DraggableCardItem } from '@/app/components/draggable-card-item';

export default function BattleArea({ cards }: { cards: any }) {
  return (
    <div
      className={
        'bg-stone-700 flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md'
      }
    >
      <div className={'flex flex-row gap-4'}>{cards?.map((id: any) => <DraggableCardItem key={id} id={id} />)}</div>
    </div>
  );
}
