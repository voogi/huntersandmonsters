'use client';
import React, { useEffect, useTransition } from 'react';
import PlayerArea from '@/app/board/components/player-area/player-area';
import OpponentArea from '@/app/board/components/opponent-area/opponent-area';
import BattleArea from '@/app/board/components/battle-area/battle-area';
import HistoryArea from '@/app/board/components/history area/history-area';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { DraggableOverlayCardItem } from '@/app/components/draggable-card-item';
import { Button } from '@nextui-org/react';
import {
  changeCardPositionOnTheBattlefield,
  moveCardToBattlefield,
  startBattle,
} from '@/app/controller/battle-controller';
import { Card } from '@prisma/client';
import { BoardProps, useBoardDnd } from '@/app/board/board.dnd.helpers';
import { CardComponent } from '@/app/components/card/card.component';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://uuxantmzdfqaqqkyrtqz.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1eGFudG16ZGZxYXFxa3lydHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3NzI5MTcsImV4cCI6MjA0NTM0ODkxN30.tgIfaKgO2s-H8oiMV9AjXVPUnB7evzv29sCwOnsZIeo');

export default function BoardComponent({ boardCards, opponentBoardCards, pCards, pDeck, player }: BoardProps) {
  const [, startTransition] = useTransition();
  const [isPendingRestart, startRestartTransition] = useTransition();

  const moveToBattleField = (cardId: number, newIndex: number) => {
    startTransition(async () => {
      await moveCardToBattlefield(cardId, newIndex);
    });
  };

  const moveOnBattleField = (cardId: number, newIndex: number) => {
    startTransition(async () => {
      await changeCardPositionOnTheBattlefield(cardId, newIndex);
    });
  };

  useEffect(() => {
    const subscription = supabase
      .channel('battle')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'battle'
        },
        (payload) => console.log(payload)
      )
      .subscribe();

    return () => {
      // supabase.removeSubscription(subscription);
    };
  }, []);

  const {
    act,
    handleDragStart,
    items,
    handleDragCancel,
    handleDragOver,
    handleDragEnd,
    dragDelta,
    handleDragMove,
    activeImage,
  } = useBoardDnd(pCards, boardCards, moveToBattleField, moveOnBattleField);

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
          <div
            className={'bg-stone-700 flex-col flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md'}>
            <div className={'flex flex-row gap-4 min-h-72 w-full justify-center items-center'}>
              {opponentBoardCards?.map((card: Card) => <CardComponent key={card.id} card={card} />)}
            </div>
            <BattleArea cards={items.boardCards || []} />
          </div>
          <PlayerArea cards={items.pCards || []} player={player} deck={pDeck} />
          <DragOverlay>{act ?
            <DraggableOverlayCardItem id={act.id} dragDelta={dragDelta} image={activeImage} /> : null}</DragOverlay>
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
