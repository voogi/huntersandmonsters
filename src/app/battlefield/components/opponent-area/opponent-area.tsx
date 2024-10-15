'use client';
import React from 'react';

export default function OpponentArea() {
  return (
    <div
      className={
        'bg-stone-800 content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md flex-grow gap-3'
      }
    >
      <img className={'rounded-lg'} style={{ maxHeight: '16em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
      <img className={'rounded-lg'} style={{ maxHeight: '16em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
      <img className={'rounded-lg'} style={{ maxHeight: '16em', objectFit: 'contain' }} src="/wolf.webp" alt="wolf" />
    </div>
  );
}
