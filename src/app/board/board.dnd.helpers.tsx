import { arrayMove as dndKitArrayMove } from '@dnd-kit/sortable';
import { Card } from '@prisma/client';
import { PlayerWithResources } from '@/app/board/board.fetcher';
import { useEffect, useState } from 'react';
import { DragEndEvent, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';

export const removeAtIndex = (array: Card[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: Card[], index: number, item: Card) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (array: Card[], oldIndex: number, newIndex: number) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};

const moveBetweenContainers = (items: { pCards: Card[], boardCards: Card[] },
                               activeContainer: string, activeIndex: number, overContainer: string, overIndex: number, item: Card | undefined) => {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer as keyof typeof items], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer as keyof typeof items], overIndex, item!),
  };
};

export type BoardProps = {
  boardCards: Card[];
  pCards: Card[];
  pDeck: Card[];
  player: PlayerWithResources;
};

export function useBoardDnd(pCards: Card[], boardCards: Card[], save: () => void) {
  const [items, setItems] = useState<{pCards: Card[], boardCards: Card[]}>({
    pCards,
    boardCards,
  });
  const [act, setAct] = useState<any>(null);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setItems({
      pCards,
      boardCards,
    });
  }, [pCards, boardCards]);

  const handleDragCancel = () => setAct(null);

  const handleDragOver = ({ active, over } : DragOverEvent) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer: string = active.data.current?.sortable.containerId;
    const overContainer: string  = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex = over.id in items ? items[overContainer as keyof typeof items].length + 1 : over.data.current?.sortable.index;

        return moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          items[activeContainer as keyof typeof items].find((i: any) => i.id === active.id),
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setAct(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.id in items ? items[overContainer as keyof typeof items].length + 1 : over.data.current?.sortable.index;

      setItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(items[overContainer as keyof typeof items], activeIndex, overIndex),
          };
        } else {
          newItems = moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            items[activeContainer as keyof typeof items].find((i: any) => i.id === active.id),
          );
        }

        return newItems;
      });
    }
    save();
    setAct(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setAct(active);
  }


  const handleDragMove = (event: DragMoveEvent) => {
    const { delta } = event;
    setDragDelta({
      x: delta.x,
      y: delta.y,
    });
  }

  return {
    act,
    setAct,
    items,
    setItems,
    handleDragCancel,
    handleDragOver,
    handleDragEnd,
    handleDragStart,
    dragDelta,
    handleDragMove
  }
}
