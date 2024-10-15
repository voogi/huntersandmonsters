import React from 'react';
import { fetchCollection } from '@/app/collection/collection.fetcher';

export default async function Page() {
  const data = await fetchCollection();
  return (
    <div>collections</div>
  );
}
