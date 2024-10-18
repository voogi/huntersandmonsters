import React, { useState, useTransition } from 'react';
import { addDeck } from '@/app/collection/actions';
import { Player, Player_Decks } from '@prisma/client';

export default function DeckCreatorComponent({ player, decks }: { player: Player; decks: Player_Decks[] }) {
  const [deckName, setDeckName] = useState('');
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const response: any = await addDeck(player.id, deckName);
      console.log(response);
    });
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Add meg a pakli nevét"
          className="border rounded p-2"
        />
        <button onClick={save} className="bg-blue-500 text-white p-2 rounded">
          Létrehozás
        </button>
      </div>

      <div className="mt-4">
        <ul className="list-disc list-inside mt-2">
          {decks.map((deck: Player_Decks, index: number) => (
            <li key={index}>{deck.deckName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
