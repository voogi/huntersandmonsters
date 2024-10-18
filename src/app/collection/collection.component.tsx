'use client';

import { Card } from '@/app/models';
import React, { useState } from 'react';
import CollectionItem from '@/app/collection/components/collection-item';

type CollectionComponentProps = {
  ownedCards: Card[];
};

export default function CollectionComponent({ ownedCards }: CollectionComponentProps) {
  const [selectedRarity, setSelectedRarity] = useState<string>(''); // Állapot a rarity szűréséhez

  // Rarity szűrő funkció
  const filteredCards = ownedCards?.filter((card) => {
    if (!selectedRarity) return true; // Ha nincs kiválasztva semmi, akkor minden kártyát megjelenítünk
    return (card.rarity as unknown as string ) === selectedRarity;
  });

  return (
    <div>
      {/* Rarity szűrő UI */}
      <div className="mb-4">
        <label htmlFor="rarity" className="mr-2">Filter by Rarity:</label>
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
          {/* További rarity opciókat itt adhatsz hozzá */}
        </select>
      </div>

      {/* Kártyák megjelenítése */}
      <div className="flex flex-row gap-4 mt-10 p-2">
        {filteredCards?.map((card: Card) => (
          <CollectionItem card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}
