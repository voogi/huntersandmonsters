import React from 'react';
import { HamButton } from '@/app/components/ham-button';

export default function Dashboard() {
  return <div className={'content-center w-full flex justify-center'}>

    <HamButton color={"primary"} className={'h-72 w-[320px]'}>End turn</HamButton>
    <HamButton color={"primary"} isLoading={true} className={'h-72 w-[320px]'}>End turn</HamButton>
  </div>;
}
