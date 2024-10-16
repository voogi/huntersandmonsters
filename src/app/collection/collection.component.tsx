'use client';

import { Card } from '@/app/models';
import React from 'react';
import CollectionItem from '@/app/collection/components/collection-item';

type CollectionComponentProps = {
  ownedCards: Card[];
};

export default function CollectionComponent({ ownedCards }: CollectionComponentProps) {
  return (
    <div className={'flex flex-row gap-4 mt-10'}>
      {ownedCards?.map((card: Card) => <CollectionItem card={card} key={card.id} />)}
    </div>
  );
}
