import React from 'react';
import HeaderMenu from '@/app/components/header/components/menu/header-menu';
import { fetchHeader } from '@/app/components/header/header.fetcher';
import PlayerSelector from '@/app/components/header/components/player-selector/player-selector';
import { cookies } from 'next/headers';

export default async function Header() {
  const { players } = await fetchHeader();
  const cookieStore = await cookies();
  const currentUser = cookieStore.get('ham.user');
  return (
    <div className={'flex flex-row justify-between p-2'}>
      <HeaderMenu />
      <div className={'w-32'}>
        <PlayerSelector players={players} currentUser={currentUser?.value || '1'}/>
      </div>
    </div>

  );
}
