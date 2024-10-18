import React from 'react';
import HeaderMenu from '@/app/components/header/components/menu/header-menu';
import { fetchHeader } from '@/app/components/header/header.fetcher';

export default async function Header() {
  const { player } = await fetchHeader();
  return (
    <div className={'flex flex-row justify-between p-2'}>
      <HeaderMenu />
      {player.name}
    </div>

  );
}
