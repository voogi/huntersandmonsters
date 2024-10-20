'use client';
import React, { useState, useTransition } from 'react';
import PlayerArea from '@/app/board/components/player-area/player-area';
import OpponentArea from '@/app/board/components/opponent-area/opponent-area';
import BattleArea from '@/app/board/components/battle-area/battle-area';
import HistoryArea from '@/app/board/components/history area/history-area';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { DraggableOverlayCardItem } from '@/app/components/draggable-card-item';
import { saveState } from '@/app/board/actions';

export default function BoardComponent({ data }: any) {
  const [battlefieldItems, setBattlefieldItems] = useState<any>(data?.boardCards);
  const [playerCards, setPlayerCards] = useState<any>(data.playerCards);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [act, setAct] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const response: any = await saveState(1, playerCards, battlefieldItems);
    });
  };

  function handleDragMove(event: DragMoveEvent) {
    const { delta } = event;
    setDragDelta({
      x: delta.x,
      y: delta.y,
    });
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setAct(active);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (
      over?.id === 'battleArea' ||
      (over?.data.current && active?.data?.current?.sortable?.containerId !== over?.data.current?.sortable.containerId)
    ) {
      if (active?.data?.current?.sortable?.containerId === 'playerCardsSortable') {
        const idx = playerCards.findIndex((i: any) => i === active.id);
        if (idx !== -1) {
          setBattlefieldItems([...battlefieldItems, ...playerCards.splice(idx, 1)]);
          setPlayerCards([...playerCards]);
        }
      }
    }
    if (
      over?.id === 'playerArea' ||
      (over?.data.current && active?.data?.current?.sortable?.containerId !== over?.data.current?.sortable.containerId)
    ) {
      if (active?.data?.current?.sortable?.containerId === 'battlefieldCardsSortable') {
        const idx = battlefieldItems.findIndex((i: any) => i === active.id);
        if (idx !== -1) {
          setPlayerCards([...playerCards, ...battlefieldItems.splice(idx, 1)]);
          setBattlefieldItems([...battlefieldItems]);
        }
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over) {
      if (active.data.current?.sortable?.containerId === 'battlefieldCardsSortable') {
        setBattlefieldItems((battlefieldItems: any) =>
          arrayMove(
            battlefieldItems,
            battlefieldItems.indexOf(event.active.id),
            battlefieldItems.indexOf(event?.over?.id),
          ),
        );
      }
      if (active.data.current?.sortable?.containerId === 'playerCardsSortable') {
        setPlayerCards((playerCards: any) =>
          arrayMove(playerCards, playerCards.indexOf(event.active.id), playerCards.indexOf(event.over?.id)),
        );
      }
    }
    setAct(null);
    save();
  }

  return (
    <div className={'grid grid-cols-8 gap-2 grid-rows-1 h-full w-full'}>
      <div className={'w-full col-span-7 gap-2 flex flex-col justify-evenly h-full'}>
        <DndContext
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <OpponentArea cards={[]} />
          <SortableContext id="battlefieldCardsSortable" items={battlefieldItems}>
            <BattleArea cards={battlefieldItems} />
          </SortableContext>
          <SortableContext id="playerCardsSortable" items={playerCards}>
            <PlayerArea cards={playerCards} player={data.player} />
          </SortableContext>
          <DragOverlay>{act ? <DraggableOverlayCardItem id={act.id} dragDelta={dragDelta} /> : null}</DragOverlay>
        </DndContext>
      </div>
      <HistoryArea />
    </div>
  );
}
