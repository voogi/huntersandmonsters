import React from 'react';
import PlayerArea from '@/app/battlefield/components/player-area/player-area';
import OpponentArea from '@/app/battlefield/components/opponent-area/opponent-area';
import BattleArea from '@/app/battlefield/components/battle-area/battle-area';
import HistoryArea from '@/app/battlefield/components/history area/history-area';

export default function Dashboard() {
  return (
    <div className={'grid grid-cols-8 gap-2 grid-rows-1 h-full w-full'}>
      <div className={'w-full col-span-7 gap-2 flex flex-col justify-evenly h-full'}>
        <OpponentArea />
        <BattleArea />
        <PlayerArea />
      </div>
      <HistoryArea />
    </div>
  );
}
