'use client';
import React, { useEffect, useState, useTransition } from 'react';
import PlayerArea from '@/app/board/components/player-area/player-area';
import OpponentArea from '@/app/board/components/opponent-area/opponent-area';
import BattleArea from '@/app/board/components/battle-area/battle-area';
import HistoryArea from '@/app/board/components/history area/history-area';
import { DndContext, DragMoveEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { DraggableOverlayCardItem } from '@/app/components/draggable-card-item';
import { saveState } from '@/app/board/actions';
import { Button } from '@nextui-org/react';
import { startBattle } from '@/app/controller/battle-controller';
import { Card } from '@prisma/client';
import { PlayerWithResources } from '@/app/board/board.fetcher';
import { arrayMove as dndKitArrayMove } from '@dnd-kit/sortable';

export const removeAtIndex = (array, index) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array, index, item) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (array, oldIndex, newIndex) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};

export type BoardProps = {
  boardCards: Card[];
  pCards: Card[];
  pDeck: Card[];
  player: PlayerWithResources;
};

export default function BoardComponent({ boardCards, pCards, pDeck, player }: BoardProps) {
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState({
    pCards,
    boardCards,
  });
  const [act, setAct] = useState<any>(null);
  const [, startTransition] = useTransition();
  const [isPendingRestart, startRestartTransition] = useTransition();

  useEffect(() => {
    setItems({
      pCards,
      boardCards,
    });
  }, [pCards, boardCards]);

  const save = () => {
    startTransition(async () => {
      await saveState(1, items.pCards, items.boardCards);
    });
  };

  const restart = () => {
    startRestartTransition(async () => {
      await startBattle();
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

  const handleDragCancel = () => setAct(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.id in items ? items[overContainer].length + 1 : over.data.current.sortable.index;

        return moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          items[activeContainer].find((i: any) => i.id === active.id),
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setAct(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.id in items ? items[overContainer].length + 1 : over.data.current.sortable.index;

      setItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
          };
        } else {
          newItems = moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            items[activeContainer].find((i: any) => i.id === active.id),
          );
        }

        return newItems;
      });
    }

    save();
    setAct(null);
  };

  const moveBetweenContainers = (items, activeContainer, activeIndex, overContainer, overIndex, item) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  return (
    <div className={'grid grid-cols-8 gap-2 grid-rows-1 h-full w-full'}>
      <div className={'w-full col-span-7 gap-2 flex flex-col justify-evenly h-full'}>
        <DndContext
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <OpponentArea cards={[]} />

          <BattleArea cards={items.boardCards} />

          <PlayerArea cards={items.pCards} player={player} deck={pDeck} />

          <DragOverlay>{act ? <DraggableOverlayCardItem id={act.id} dragDelta={dragDelta} /> : null}</DragOverlay>
        </DndContext>
        <div className={'flex'}>
          <Button isLoading={isPendingRestart} size={'md'} onPress={restart} color="primary">
            Restart
          </Button>
        </div>
      </div>
      <HistoryArea />
    </div>
  );
}
