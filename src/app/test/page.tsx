'use client';
import React from 'react';
import { CardComponent } from '@/app/components/card/card.component';

export default function Dashboard() {
  return (
    <div className={'content-center w-full flex justify-center'}>
      {/*<HamButton color={"primary"} className={'h-72 w-[320px]'}>End turn</HamButton>*/}
      {/*<HamButton color={"primary"} isLoading={true} className={'h-72 w-[320px]'}>End turn</HamButton>*/}

      <CardComponent
        card={{
          image: '/zombie.png',
          name: 'Zombie',
          attack: 10,
          health: 5,
        }}
      />
    </div>
  );
}
