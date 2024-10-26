'use client';
import React from 'react';
import { Event } from '@prisma/client';

export default function HistoryArea({ events }: { events: Event[] }) {
  return (
    <div
      className={
        'bg-stone-500 gap-2 w-full p-4 overflow-y-auto box-border flex flex-wrap justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md'
      }
    >
      <div>
        {events.map((event) => (<div key={event.id}>P{event.playerId} {event.battleEvent}</div>))}
      </div>
    </div>
  );
}
