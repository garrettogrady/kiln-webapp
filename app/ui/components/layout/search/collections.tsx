import clsx from 'clsx';
import { Suspense } from 'react';

import FilterList from './filter';

async function CollectionList() {
  const collections = ["Bar", "Restaurant", "Hotel"]
  return <FilterList list={collections} title="Collections" />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections() {
  return (
      <CollectionList />
  );
}
