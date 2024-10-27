'use client';
import React, { useEffect, useState, useTransition } from 'react';
import PlayerArea from '@/app/board/components/player-area/player-area';
import OpponentArea from '@/app/board/components/opponent-area/opponent-area';
import BattleArea from '@/app/board/components/battle-area/battle-area';
import HistoryArea from '@/app/board/components/history area/history-area';
import { DndContext, DragOverlay, MeasuringStrategy } from '@dnd-kit/core';
import { DraggableCardItem, DraggableOverlayCardItem } from '@/app/components/draggable-card-item';
import { Button } from '@nextui-org/react';
import {
  changeCardPositionOnTheBattlefield,
  moveCardToBattlefield,
  startBattle,
} from '@/app/controller/battle-controller';
import { BattleEvent, Card } from '@prisma/client';
import { arrayMove, BoardProps, useBoardDnd } from '@/app/board/board.dnd.helpers';
import { createClient } from '@supabase/supabase-js';
import { AnimationControls } from 'framer-motion';
import { Event } from '@prisma/client';
import { SortableContext } from '@dnd-kit/sortable';
import { battleAnimation, playCardAnimation } from '@/app/animations/board.animations';
import { PlayerType } from '@/app/models';

const supabase = createClient(
  'https://uuxantmzdfqaqqkyrtqz.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1eGFudG16ZGZxYXFxa3lydHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3NzI5MTcsImV4cCI6MjA0NTM0ODkxN30.tgIfaKgO2s-H8oiMV9AjXVPUnB7evzv29sCwOnsZIeo',
);

export default function BoardComponent({
  boardCards,
  opponentBoardCards,
  pCards,
  oCards,
  pDeckSize,
  oDeckSize,
  player,
  events,
}: BoardProps) {
  const [, startTransition] = useTransition();
  const [isPendingRestart, startRestartTransition] = useTransition();
  const [oppCards, setOppCards] = useState(opponentBoardCards);
  const [selectedCards, setSelectedCards] = useState<{ id: number; ref: any; controls: AnimationControls }[]>([]);

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
      .channel('event')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Event',
        },
        (payload) => {
          const event: any = payload.new as Event;
          if (event.playerId === player.id) {
            return;
          }
          if (event.eventData) {
            if (event.battleEvent === BattleEvent.PLAY_CARD) {
              playCardAnimation(opponentBoardCards, event, (newOppCards: Card[]) => {
                opponentBoardCards = newOppCards;
                setOppCards([...opponentBoardCards]);
              });
            }

            if (event.battleEvent === BattleEvent.ATTACK_CARD) {
              battleAnimation(selectedCards, () => {
                setSelectedCards([]);
              });
            }

            if (event.battleEvent === BattleEvent.REORDER_BOARD) {
              opponentBoardCards = arrayMove(opponentBoardCards, event.eventData.oldIndex, event.eventData.newIndex);
              setOppCards([...opponentBoardCards]);
            }
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase]);

  useEffect(() => {
    battleAnimation(selectedCards, () => {
      setSelectedCards([]);
    });
  }, [selectedCards]);

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

  const handleCardClick = (id: number, ref: HTMLDivElement, controls: AnimationControls, type: any) => {
    if (ref === null) {
      setSelectedCards((prev: any) => prev.filter((item: any) => item.id !== id));
    } else {
      setSelectedCards((prev: any) => {
        const updated = [...prev, { id, ref, controls, type }];
        return updated.length > 2 ? updated.slice(1) : updated;
      });
    }
  };

  return (
    <div className={'grid grid-cols-8 gap-2 grid-rows-1 h-full w-full'}>
      <div className={'w-full col-span-7 gap-2 flex flex-col justify-evenly h-full relative'}>
        <DndContext
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
        >
          <OpponentArea cards={oCards} deckSize={oDeckSize} />
          <div
            className={
              'bg-stone-700 flex-col flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md'
            }
          >
            <SortableContext items={oppCards} id={'opponentBoardCards'}>
              <div className={'flex flex-row gap-4 h-full min-h-20 mb-5 w-full justify-center items-center'}>
                {oppCards?.map((card: Card) => (
                  <DraggableCardItem
                    selectedCards={selectedCards}
                    onClick={handleCardClick}
                    type={PlayerType.OPPONENT}
                    disable={true}
                    key={card.id}
                    card={card}
                  />
                ))}
              </div>
            </SortableContext>
            <BattleArea selectedCards={selectedCards} onClick={handleCardClick} cards={items.boardCards || []} />
          </div>
          <PlayerArea cards={items.pCards || []} player={player} deckSize={pDeckSize} />
          <DragOverlay>
            {act ? <DraggableOverlayCardItem id={act.id} dragDelta={dragDelta} image={activeImage} /> : null}
          </DragOverlay>
        </DndContext>
        <div className={'flex absolute bottom-2 right-3'}>
          <Button isLoading={isPendingRestart} size={'md'} onPress={restart} color="primary">
            Restart
          </Button>
        </div>
      </div>
      <HistoryArea events={events} />
    </div>
  );
}
