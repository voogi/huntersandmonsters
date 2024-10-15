import React from 'react';

export default function Header() {
  return (
    <div className={'content-left w-full flex justify-left box-border gap-3'}>
      <div className={'p-2'}>DASHBOARD</div>
      <div className={'bg-stone-700 p-2'}>GAME</div>
      <div className={'p-2'}>COLLECTION</div>
      <div className={'p-2'}>SETTINGS</div>
    </div>
  );
}
