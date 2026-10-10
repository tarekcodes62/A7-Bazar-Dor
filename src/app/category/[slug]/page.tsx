import ProductCard from '@/components/ProductCard';
import ProductGridSkeleton from '@/components/ProductGridSkeleton';
import SortSelect from '@/components/SortSelect';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

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
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default function CategoryPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryProducts params={params} searchParams={searchParams} />
    </Suspense>
  );
}

function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-12">
        {/* Category heading skeleton */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="mb-3 h-8 w-48 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-64 max-w-full animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Toolbar skeleton */}
        <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* Product cards skeleton */}
        <ProductGridSkeleton />
      </div>
    </div>
  );
}

async function CategoryProducts({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
  );

  if (!res.ok) {
    notFound();
  }

  const products: ProductType[] = await res.json();

  if (!products || products.length === 0) {
    notFound();
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'asc') return a.today - b.today;
    if (sort === 'desc') return b.today - a.today;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto mb-6 max-w-6xl px-6 md:px-12">
        <div className="my-6 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-6">
          <span className="text-5xl">{products[0].image}</span>
          <div>
            <h2 className="text-3xl">{products[0].categoryNameBn}</h2>
            <p className="text-[#7c7c7c]">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <p>মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>

          <div className="flex items-center gap-3 md:justify-end">
            <span className="text-gray-600">সাজান</span>
            <Suspense
              fallback={
                <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
              }
            >
              <SortSelect />
            </Suspense>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
