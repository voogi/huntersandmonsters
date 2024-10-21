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
import { Button } from '@nextui-org/react';
import { startBattle } from '@/app/controller/battle-controller';
import { Card } from '@prisma/client';

export default function BoardComponent({ data }: any) {
  const [battlefieldItems, setBattlefieldItems] = useState<Card[]>(data?.boardCards);
  const [playerCards, setPlayerCards] = useState<Card[]>(data.playerCards);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [act, setAct] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [isPendingRestart, startRestartTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const response: any = await saveState(1, playerCards, battlefieldItems);
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
        const idx = playerCards.findIndex((i: Card) => i.id === Number(active.id));
        if (idx !== -1) {
          const newPlayerCards = [...playerCards];
          const removed = newPlayerCards.splice(idx, 1);
          if (JSON.stringify(battlefieldItems.concat(removed)) !== JSON.stringify(battlefieldItems)) {
            setBattlefieldItems([...battlefieldItems, ...removed]);
            setPlayerCards(newPlayerCards);
          }
        }
      }
    }

    if (
      over?.id === 'playerArea' ||
      (over?.data.current && active?.data?.current?.sortable?.containerId !== over?.data.current?.sortable.containerId)
    ) {
      if (active?.data?.current?.sortable?.containerId === 'battlefieldCardsSortable') {
        const idx = battlefieldItems.findIndex((i: Card) => i.id === Number(active.id));
        if (idx !== -1) {
          const newBattlefieldItems = [...battlefieldItems];
          const removed = newBattlefieldItems.splice(idx, 1);
          if (JSON.stringify(playerCards.concat(removed)) !== JSON.stringify(playerCards)) {
            setPlayerCards([...playerCards, ...removed]);
            setBattlefieldItems(newBattlefieldItems);
          }
        }
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over) {
      if (active.data.current?.sortable?.containerId === 'battlefieldCardsSortable') {
        const activeCard = battlefieldItems.find((item: Card) => item.id === Number(active.id));
        const overCard = battlefieldItems.find((item: Card) => item.id === Number(over.id));

        if (activeCard && overCard) {
          const newItems = arrayMove(
            battlefieldItems,
            battlefieldItems.indexOf(activeCard),
            battlefieldItems.indexOf(overCard),
          );
          setBattlefieldItems(newItems);
        }
      }

      if (active.data.current?.sortable?.containerId === 'playerCardsSortable') {
        const activeCard = playerCards.find((item: Card) => item.id === Number(active.id));
        const overCard = playerCards.find((item: Card) => item.id === Number(over.id));

        if (activeCard && overCard) {
          const newItems = arrayMove(playerCards, playerCards.indexOf(activeCard), playerCards.indexOf(overCard));
          setPlayerCards(newItems);
        }
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
          <SortableContext id="battlefieldCardsSortable" items={battlefieldItems.map((c: Card) => c.id)}>
            <BattleArea cards={battlefieldItems} />
          </SortableContext>
          <SortableContext id="playerCardsSortable" items={playerCards.map((c: Card) => c.id)}>
            <PlayerArea cards={playerCards} player={data.player} />
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
