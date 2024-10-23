'use client';
import React, { useTransition } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Player } from '@prisma/client';
import { changePlayer } from '@/app/controller/user-controller';

export default function PlayerSelector(props: { players: Player[], currentUser: string }) {
  const [, startTransition] = useTransition();

  const change = (playerId: string) => {
    startTransition(async () => {
      await changePlayer(playerId);
    });
  };

  return (
    <Select
      size="sm"
      label="Player"
      className="max-w-xs text-sm"
      onChange={(e) => change(e.target.value)}
      selectedKeys={[props.currentUser]}
    >
      {props.players?.map((player: Player) => (
        <SelectItem key={player.id} value={player.id}>{player.name}</SelectItem>
      ))}
    </Select>
  );
}
