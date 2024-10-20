'use client';
import React, { useState } from 'react';
import CollectionItem from '@/app/collection/components/collection-item';
import DeckCreatorComponent from '@/app/collection/components/deck-creator.component';
import { Card, Player } from '@prisma/client';
import { Select, SelectItem } from '@nextui-org/react';
import { rarityOptions } from '@/app/models';
import { DeckCardWithCard, PlayerDeckWithCards } from '@/app/collection/collection.fetcher';

type CollectionComponentProps = {
  ownedCards: Card[];
  playerDecks: PlayerDeckWithCards[];
  player: Player;
};

export default function CollectionComponent({ ownedCards, playerDecks, player }: CollectionComponentProps) {
  const [selectedRarity, setSelectedRarity] = useState<string>('');

  const filteredCards = ownedCards?.filter((card) => {
    if (!selectedRarity) return true;
    return (card.rarity as unknown as string) === selectedRarity;
  });

  return (
    <div className={'h-full w-full flex flex-row box-border'}>
      <div className="mb-4 p-2 flex flex-col box-border" style={{ flex: '66%' }}>
        <Select
          size="sm"
          label="Rarity"
          className="max-w-2xl text-sm"
          onChange={(e) => setSelectedRarity(e.target.value)}
        >
          {rarityOptions.map((rarity) => (
            <SelectItem key={rarity.key}>{rarity.label}</SelectItem>
          ))}
        </Select>
        <div className="flex flex-row gap-4 mt-10 p-2">
          {filteredCards?.map((card: Card) => (
            <CollectionItem inDeck={false} player={player} card={card} key={card.id} />
          ))}
        </div>
        <div className="flex flex-row gap-4 mt-10 p-2">
          {playerDecks
            ?.filter((i: PlayerDeckWithCards) => i.id === player.editedDeckId)
            .map((deck: PlayerDeckWithCards) => (
              <React.Fragment key={deck.id}>
                {deck.cards?.map((dCard: DeckCardWithCard) => (
                  <CollectionItem inDeck={true} player={player} card={dCard.card} key={dCard.id} />
                ))}
              </React.Fragment>
            ))}
        </div>
      </div>
      <div className={'flex flex-col box-border'} style={{ flex: '33%' }}>
        <DeckCreatorComponent player={player} decks={playerDecks} />
      </div>
    </div>
  );
}
