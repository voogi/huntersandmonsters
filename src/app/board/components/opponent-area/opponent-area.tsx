'use client';
import React from 'react';
import { CardComponent } from '@/app/components/card/card.component';

export default function OpponentArea({cards, deckSize}: { cards: number, deckSize: number }) {
  const offset = 2;
  return (
    <div
      className={
        'bg-stone-600 flex-grow content-center w-full p-4 box-border flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md gap-3'
      }
    >
      <div className={'flex flex-row gap-12'}>
        <div className={'flex flex-row min-h-72 w-full justify-center items-center'}>
          {Array.from({ length: cards }).map((_, index) => (
            <CardComponent enableAnimation={false} onlyImg={true} key={index} card={{ image: '/back.png' }} />
          ))}
        </div>
        <div>
          <div>DECK - {deckSize}</div>
          <div style={{ position: 'relative'}}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: index * offset,
                  left: index * offset,
                  zIndex: deckSize - index,
                }}
              ><CardComponent enableAnimation={false} onlyImg={true} card={{ image: 'back.png' }} /></div>
            ))}
          </div>
          <div className={'flex justify-end'}>
            opponent resources
          </div>
        </div>
      </div>
    </div>
  );
}
