import React, { useState, useTransition } from 'react';
import { addDeck, removeDeck, updateEditedDeckId } from '@/app/collection/actions';
import { Player, Player_Decks } from '@prisma/client';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';
import { Checkbox } from '@nextui-org/checkbox';
import { Chip } from '@nextui-org/chip';

export default function DeckCreatorComponent({ player, decks }: { player: Player; decks: Player_Decks[] }) {
  const [deckName, setDeckName] = useState('');
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const response: any = await addDeck(player.id, deckName);
      console.log(response);
    });
  };
  const onDeleteDeck = (id: number) => {
    startTransition(async () => {
      const response: any = await removeDeck(id);
      console.log(response);
    });
  };

  const activateDeck = (id: number) => {
    startTransition(async () => {
      const response: any = await updateEditedDeckId(player.id, id);
      console.log(response);
    });
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4 items-center">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            size={'md'}
            label="Deck name"
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="Add meg a pakli nevét"
          />
        </div>
        <Button isLoading={isPending} size={'md'} disabled={deckName !== ''} onPress={save} color="primary">
          Létrehozás
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex flex-col mt-2 gap-4">
          {decks.map((deck: Player_Decks, index: number) => (
            <Card className="max-w" key={index}>
              <CardHeader className="flex gap-3">
                <Image alt="nextui logo" height={40} radius="sm" src="/deck2.webp" width={40} />
                <div className="flex flex-col">
                  <p className="text-md">{deck.deckName}</p>
                </div>
                {player.editedDeckId === deck.id && (
                  <Chip className={'ml-auto'} color="success">
                    Active
                  </Chip>
                )}
              </CardHeader>
              <Divider />
              <CardBody>
                <p>Deck description</p>
              </CardBody>
              <Divider />
              <CardFooter className={'justify-between'}>
                <Button
                  onPress={() => {
                    activateDeck(deck.id);
                  }}
                >
                  Activate
                </Button>
                <Button
                  isLoading={isPending}
                  size={'md'}
                  onPress={() => {
                    onDeleteDeck(deck.id);
                  }}
                  color="primary"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
