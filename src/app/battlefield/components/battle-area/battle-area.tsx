'use client';
import React from 'react';

export default function BattleArea() {
  return (
    <div
      style={{ flexGrow: 2 }}
      className={
        'bg-stone-700 content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md'
      }
    >
      <div className={'grid grid-cols-7 grid-rows-2 gap-2'}>
        <div />
        <img className={'rounded-lg'} style={{ maxHeight: '12em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
        <img className={'rounded-lg'} style={{ maxHeight: '12em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
        <img className={'rounded-lg'} style={{ maxHeight: '12em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
        <div />
        <img className={'rounded-lg'} style={{ maxHeight: '12em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
        <div />
        <div />
        <div />
        <div />
        <img className={'rounded-lg'} style={{ maxHeight: '12em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
      </div>
    </div>
  );
}
