import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className={'content-left w-full flex justify-left box-border gap-3'}>
      <div className={'p-2'}>DASHBOARD</div>
      <Link href={'/board'} className={'bg-stone-700 p-2'}>GAME</Link>
      <Link href={'/collection'} className={'p-2'}>COLLECTION</Link>
      <div className={'p-2'}>SETTINGS</div>
      <Link href={'/test'} className={'p-2'}>TEST</Link>
    </div>
  );
}
