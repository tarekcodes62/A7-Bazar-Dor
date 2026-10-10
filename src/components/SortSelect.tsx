'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export type SortOption = 'default' | 'asc' | 'desc';

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get('sort') ?? 'default';

  const handleSort = (value: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    const query = params.toString();

    router.replace(query ? `?${query}` : '?', {
      scroll: false,
    });
  };

  return (
    <select
      value={sort}
      onChange={e => handleSort(e.target.value as SortOption)}
      className="rounded-xl border-2 border-gray-800 bg-white px-4 py-2"
    >
      <option value="default">ডিফল্ট</option>
      <option value="asc">দাম: কম থেকে বেশি</option>
      <option value="desc">দাম: বেশি থেকে কম</option>
    </select>
  );
}
