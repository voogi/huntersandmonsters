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

const PLAYER_AREA_ID: string = 'pCards';

export default function PlayerArea({
  cards,
  player,
  deck,
}: {
  cards: Card[];
  player: PlayerWithResources;
  deck: Card[];
}) {
  const { setNodeRef } = useDroppable({
    id: PLAYER_AREA_ID,
  });

  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={
        'bg-stone-600 flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md gap-3'
      }
    >
      <div className={'flex- flex-col w-full'}>
        <div className={'flex justify-end'}>
          <PlayerResources resources={player?.resources} />
        </div>
        <div>Player DECK - {deck?.length}</div>
        <div>
          <Button
            size={'md'}
            color="primary"
            onPress={() => {
              startTransition(async () => {
                await drawCard(player.id);
              });
            }}
          >
            +
          </Button>
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
