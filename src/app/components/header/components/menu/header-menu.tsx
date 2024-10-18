'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-stone-700' : '';
  };
  return (
    <div className={'content-left w-full flex justify-left box-border gap-3'}>
      <div>DASHBOARD</div>
      <Link href={'/board'} className={` ${isActive('/board')}`}>
        GAME
      </Link>
      <Link href={'/collection'} className={`${isActive('/collection')}`}>
        COLLECTION
      </Link>
      <div>SETTINGS</div>
      <Link href={'/test'} className={`${isActive('/test')}`}>
        TEST
      </Link>
    </div>
  );
}
