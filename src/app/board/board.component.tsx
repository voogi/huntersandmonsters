'use client';
import React, { useEffect, useReducer, useState, useTransition } from 'react';
import PlayerArea from '@/app/board/components/player-area/player-area';
import OpponentArea from '@/app/board/components/opponent-area/opponent-area';
import BattleArea from '@/app/board/components/battle-area/battle-area';
import HistoryArea from '@/app/board/components/history area/history-area';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { DraggableOverlayCardItem } from '@/app/components/draggable-card-item';
import { saveState } from '@/app/board/actions';
import { Button } from '@nextui-org/react';
import { startBattle } from '@/app/controller/battle-controller';
import { Card } from '@prisma/client';
import { PlayerWithResources } from '@/app/board/board.fetcher';

export type BoardProps = {
  boardCards: Card[];
  pCards: Card[];
  pDeck: Card[];
  player: PlayerWithResources;
};

const reducer = (state: Card[], action: { type: string; payload: Card[] }) => {
  switch (action.type) {
    case 'UPDATE_PCARD':
      return action.payload;
    default:
      return state;
  }
};

export default function BoardComponent({ boardCards, pCards: initialPCards, pDeck, player }: BoardProps) {
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [pCards, dispatchPCards] = useReducer(reducer, initialPCards);
  const [act, setAct] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [isPendingRestart, startRestartTransition] = useTransition();

  useEffect(() => {
    dispatchPCards({ type: 'UPDATE_PCARD', payload: initialPCards });
  }, [initialPCards]);

  const save = (pCards: Card[], bCards: Card[]) => {
    dispatchPCards({ type: 'UPDATE_PCARD', payload: pCards });
    startTransition(async () => {
      const response: any = await saveState(1, pCards, bCards);
    });
  };

  const restart = () => {
    startRestartTransition(async () => {
      const response: any = await startBattle();
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
        const idx = pCards.findIndex((i: Card) => i.id === Number(active.id));
        if (idx !== -1) {
          const newPlayerCards = [...pCards];
          const removed = newPlayerCards.splice(idx, 1);
        }
      }
    }

    if (
      over?.id === 'playerArea' ||
      (over?.data.current && active?.data?.current?.sortable?.containerId !== over?.data.current?.sortable.containerId)
    ) {
      if (active?.data?.current?.sortable?.containerId === 'battlefieldCardsSortable') {
        const idx = boardCards.findIndex((i: Card) => i.id === Number(active.id));
        if (idx !== -1) {
          const newBattlefieldItems = [...boardCards];
          const removed = newBattlefieldItems.splice(idx, 1);
        }
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over) {
      if (active.data.current?.sortable?.containerId === 'battlefieldCardsSortable') {
        const activeCard = boardCards.find((item: Card) => item.id === Number(active.id));
        const overCard = boardCards.find((item: Card) => item.id === Number(over.id));

        if (activeCard && overCard) {
          const newItems = arrayMove(boardCards, boardCards.indexOf(activeCard), boardCards.indexOf(overCard));
          save(pCards, newItems);
        }
      }

      if (active.data.current?.sortable?.containerId === 'playerCardsSortable') {
        const activeCard = pCards.find((item: Card) => item.id === Number(active.id));
        const overCard = pCards.find((item: Card) => item.id === Number(over.id));

        if (activeCard && overCard) {
          const newItems = arrayMove(pCards, pCards.indexOf(activeCard), pCards.indexOf(overCard));
          save(newItems, boardCards);
        }
      }
    }
    setAct(null);
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
          <SortableContext id="battlefieldCardsSortable" items={boardCards.map((c: Card) => c.id)}>
            <BattleArea cards={boardCards} />
          </SortableContext>
          <SortableContext id="playerCardsSortable" items={pCards?.map((c: Card) => c.id)}>
            <PlayerArea cards={pCards} player={player} deck={pDeck} />
          </SortableContext>
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
