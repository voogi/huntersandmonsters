'use client';
import React, { useTransition } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { BattlePhase } from '@prisma/client';
import { changePhase } from '@/app/controller/battle-controller';

export default function PhaseSelector(props: { currentPhase: BattlePhase }) {
  const [isLoading, startTransition] = useTransition();

  const change = (playerId: string) => {
    startTransition(async () => {
      await changePhase(playerId);
    });
  };

  return (
    <Select
      size="md"
      isLoading={isLoading}
      className="text-md min-w-44"
      onChange={(e) => change(e.target.value)}
      selectedKeys={[props.currentPhase]}
    >
      {Object.values(BattlePhase).map((phase: BattlePhase) => (
        <SelectItem key={phase} value={phase}>{phase}</SelectItem>
      ))}
    </Select>
  );
}
