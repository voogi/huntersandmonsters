'use client';
import React from 'react';
import { DraggableCardItem } from '@/app/components/draggable-card-item';
import { useDroppable } from '@dnd-kit/core';
import PlayerResources from '@/app/board/components/player-area/components/player-resources';
import { PlayerWithResources } from '@/app/board/board.fetcher';
import { Button } from '@nextui-org/react';
import { addResource, removeResource } from '@/app/actions/resource-management';
import { Card, ResourceType } from '@prisma/client';

export default function PlayerArea({ cards, player }: { cards: Card[]; player: PlayerWithResources }) {
  const { setNodeRef } = useDroppable({
    id: 'playerArea',
  });

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
        <div className={'flex justify-end mt-2 gap-2'}>
          <Button
            size={'md'}
            color="primary"
            onPress={() => {
              addResource(player.id, ResourceType.SILVER_BULLET, 1);
            }}
          >
            +
          </Button>
          <Button
            size={'md'}
            onPress={() => {
              removeResource(player.id, ResourceType.SILVER_BULLET, 1);
            }}
            color="primary"
          >
            -
          </Button>
        </div>
        <div ref={setNodeRef} className={'flex flex-row min-h-72 w-full justify-center items-center'}>
          {cards?.map((card: Card) => <DraggableCardItem key={card.id} card={card} />)}
        </div>
      </div>
    </div>
  );
}
