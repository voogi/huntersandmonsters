import React from 'react';
import PlayerArea from '@/app/battlefield/components/player-area/player-area';

export default function Dashboard() {
  return (
    <div className={'content-center w-full flex justify-center'}>
      <PlayerArea />
    </div>
  );
}
