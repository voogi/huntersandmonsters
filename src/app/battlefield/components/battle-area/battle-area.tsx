'use client';
import React, { useState } from 'react';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { DraggableCardItem } from '@/app/components/draggable-card-item';

const initialItems = [...Array(10).keys()].map(() => generateRandomCode());

export default function BattleArea() {
  const [items, setItems] = useState(initialItems);

  function handleDragEnd(event: DragEndEvent) {
    setItems((items) => arrayMove(items, items.indexOf(event.active.id), items.indexOf(event.over.id)));
  }

  return (
    <div
      className={
        'bg-stone-700 flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md'
      }
    >
      <DndContext
        collisionDetection={closestCenter}
        // onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={'grid grid-cols-4 gap-2 w-2/3 mx-auto mt-10'} style={{ perspective: 800 }}>
          <SortableContext strategy={rectSortingStrategy} items={items}>
            {items.map((id) => (
              <DraggableCardItem key={id} id={id} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}

function generateRandomCode() {
  const n: string = (Math.random() * 0xfffff * 1000000).toString(16);
  return n.slice(0, 6);
}
