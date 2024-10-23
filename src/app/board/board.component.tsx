'use client';
import React, {useTransition } from 'react';
import PlayerArea from '@/app/board/components/player-area/player-area';
import OpponentArea from '@/app/board/components/opponent-area/opponent-area';
import BattleArea from '@/app/board/components/battle-area/battle-area';
import HistoryArea from '@/app/board/components/history area/history-area';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { DraggableOverlayCardItem } from '@/app/components/draggable-card-item';
import { saveState } from '@/app/board/actions';
import { Button } from '@nextui-org/react';
import { startBattle } from '@/app/controller/battle-controller';
import { BoardProps, useBoardDnd } from '@/app/board/board.dnd.helpers';

export default function BoardComponent({ boardCards, pCards, pDeck, player }: BoardProps) {
  const [, startTransition] = useTransition();
  const [isPendingRestart, startRestartTransition] = useTransition();
  const save = () => {
    startTransition(async () => {
      await saveState(1, items.pCards, items.boardCards);
    });
  };

  const {act, handleDragStart, items, handleDragCancel, handleDragOver, handleDragEnd, dragDelta, handleDragMove}= useBoardDnd(pCards,boardCards, save);

  const restart = () => {
    startRestartTransition(async () => {
      await startBattle();
    });
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
