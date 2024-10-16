import React from 'react';
import { fetchCollection } from '@/app/collection/collection.fetcher';
import CollectionComponent from '@/app/collection/collection.component';

export default async function Page() {
  const data = await fetchCollection();
  return <CollectionComponent {...data} />;
}
