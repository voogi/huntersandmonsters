'use client';
import React from 'react';

export default function PlayerArea() {
  return (
    <div
      className={
        'bg-stone-600 content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md gap-3'
      }
    >
      <div className={'flex flex-row'}>
        <img className={'rounded-lg'} style={{ maxHeight: '16em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
        <img className={'rounded-lg'} style={{ maxHeight: '16em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
        <img className={'rounded-lg'} style={{ maxHeight: '16em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
        <img className={'rounded-lg'} style={{ maxHeight: '16em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
      </div>
      <div>resource 5/5</div>
    </div>
  );
}
