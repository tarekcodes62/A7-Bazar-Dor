import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import SortSelect from '@/components/SortSelect';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ProductGridSkeleton from '@/components/ProductGridSkeleton';

interface ProductType {
  categoryNameBn: string;
  image: string;
  change: { dir: string; pct: number };
  id: number;
  today: number;
  nameBn: string;
  slug: string;
}

type Props = {
  searchParams: Promise<{ sort?: string }>;
};

export default function HomePage({ searchParams }: Props) {
  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <HeroBanner />

        <Suspense fallback={<ProductGridSkeleton />}>
          <HomeProducts searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function HomeProducts({ searchParams }: Props) {
  const { sort } = await searchParams;

  const response = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/products',
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    notFound();
  }

  const categories: ProductType[] = await response.json();
  const sortedCategories = [...categories].sort((a, b) => {
    if (sort === 'asc') return a.today - b.today;
    if (sort === 'desc') return b.today - a.today;
    return 0;
  });

  const todayConstUp = categories
    .filter(product => product.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct);

  const todayConstDown = categories
    .filter(product => product.change.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct);

  return (
    <>
      {/* দাম বেড়েছে */}
      <section className="my-5 pt-4">
        <h2 className="text-2xl font-medium mb-4">
          <span className="text-green-600">▲</span> আজ দাম বেড়েছে
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayConstUp.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* দাম কমেছে */}
      <section className="my-5 pt-4">
        <h2 className="text-2xl font-medium mb-4">
          <span className="text-red-600">▼</span> আজ দাম কমেছে
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayConstDown.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* সব পণ্য */}
      <section className="my-5 pt-4" id="সব-পণ্য">
        <h2 className="text-2xl font-medium">সব পণ্য</h2>

        <div className="flex items-center justify-between mb-4">
          <p>মোট {categories.length}টি পণ্য দেখানো হচ্ছে</p>

          <div className="flex items-center gap-3">
            <span className="text-gray-600">সাজান</span>

            <Suspense fallback={<ProductGridSkeleton />}>
              <SortSelect />
            </Suspense>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCategories.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
