'use client';
import React, { useTransition } from 'react';
import { DraggableCardItem } from '@/app/components/draggable-card-item';
import { useDroppable } from '@dnd-kit/core';
import PlayerResources from '@/app/board/components/player-area/components/player-resources';
import { PlayerWithResources } from '@/app/board/board.fetcher';
import { Card } from '@prisma/client';
import { Button } from '@nextui-org/react';
import { drawCard } from '@/app/controller/battle-controller';
import { SortableContext } from '@dnd-kit/sortable';
import { CardComponent } from '@/app/components/card/card.component';

export const PLAYER_AREA_ID: string = 'pCards';

export default function PlayerArea({
  cards,
  player, deckSize,
}: {
  cards: Card[];
  player: PlayerWithResources;
  deckSize: number;
}) {
  const { setNodeRef } = useDroppable({
    id: PLAYER_AREA_ID,
  });

  const [, startTransition] = useTransition();
  const offset = 2;

  return (
    <div
      className={
        'bg-stone-600 flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md gap-3'
      }
    >
      <div className={'flex flex-col w-full'}>
        <div className={'flex justify-end'}>
          <PlayerResources resources={player?.resources} />
        </div>
        <div>DECK - {deckSize}</div>
        <div>
          <div style={{ position: 'relative'}}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: index * offset,
                  left: index * offset,
                  zIndex: deckSize - index,
                }}
              ><CardComponent enableAnimation={false} onlyImg={true} card={{image: 'back.png'}}/></div>
            ))}
          </div>
        </div>
        <SortableContext items={cards} id={PLAYER_AREA_ID}>
          <div ref={setNodeRef} className={'flex flex-row min-h-72 w-full justify-center items-center'}>
            {cards?.map((card: Card) => <DraggableCardItem key={card.id} card={card} />)}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
