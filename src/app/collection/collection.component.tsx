'use client';
import React, { useState } from 'react';
import CollectionItem from '@/app/collection/components/collection-item';
import DeckCreatorComponent from '@/app/collection/components/deck-creator.component';
import { Card, Player_Decks } from '@prisma/client';

type CollectionComponentProps = {
  ownedCards: Card[];
  playerDecks: Player_Decks[];
  player: any;
};

export default function CollectionComponent({ ownedCards, playerDecks, player }: CollectionComponentProps) {
  const [selectedRarity, setSelectedRarity] = useState<string>('');

  const filteredCards = ownedCards?.filter((card) => {
    if (!selectedRarity) return true;
    return (card.rarity as unknown as string) === selectedRarity;
  });

  return (
    <div className={'h-full'}>
      <div className="mb-4 p-2">
        <label htmlFor="rarity" className="mr-2">
          Filter by Rarity:
        </label>
        <select
          id="rarity"
          value={selectedRarity}
          onChange={(e) => setSelectedRarity(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          <option value="COMMON">Common</option>
          <option value="RARE">Rare</option>
          <option value="EPIC">Epic</option>
          <option value="LEGENDARY">Legendary</option>
        </select>
      </div>

      <div className="flex flex-row gap-4 mt-10 p-2">
        {filteredCards?.map((card: Card) => <CollectionItem card={card} key={card.id} />)}
      </div>
      <div className={'mt-auto flex flex-row'}>
        <DeckCreatorComponent player={player} decks={playerDecks} />
      </div>
    </div>
  );
}
