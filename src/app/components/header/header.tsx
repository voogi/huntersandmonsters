'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-stone-700' : '';
  };
  return (
    <div className={'content-left w-full flex justify-left box-border gap-3'}>
      <div className={'p-2'}>DASHBOARD</div>
      <Link href={'/board'} className={`p-2 ${isActive('/board')}`}>
        GAME
      </Link>
      <Link href={'/collection'} className={`p-2 ${isActive('/collection')}`}>
        COLLECTION
      </Link>
      <div className={'p-2'}>SETTINGS</div>
      <Link href={'/test'} className={`p-2 ${isActive('/test')}`}>
        TEST
      </Link>
    </div>
  );
}
