import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductType {
  category: string;
  categoryIcon: string;
  categoryNameBn: string;
  change: {
    dir: 'up' | 'down';
    pct: number;
  };
  id: number;
  image: string;
  lastMonth: number;
  lastWeek: number;
  markets: Market[];
  nameBn: string;
  slug: string;
  today: number;
  unit: string;
  yesterday: number;
}

export default function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsCard params={params} />
    </Suspense>
  );
}
const unitMap: Record<string, string> = {
  kg: 'কেজি',
  gram: 'গ্রাম',
  litre: 'লিটার',
  piece: 'টি',
  dozen: 'ডজন',
  bag: 'বস্তা',
};

async function ProductDetailsCard({ params }: { params: { slug: string } }) {
  const { slug } = await params;

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

  const products: ProductType[] = categories?.filter(
    cate => cate.slug === slug,
  );
  const product = products[0];
  if (!product) {
    notFound();
  }

  const prices = product.markets.flatMap(market => [market.min, market.max]);

  const minPrice = prices.length ? Math.min(...prices) : product.today;

  const maxPrice = prices.length ? Math.max(...prices) : product.today;

  const avgPrice = Math.floor((maxPrice + minPrice) / 2);

  const isUp = product.change.dir === 'up';
  const flat = product.change.dir.toLowerCase() === 'flat';

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('bn-BD', {
      maximumFractionDigits: 2,
    }).format(price);

  const unitName = unitMap[product.unit] ?? product.unit;

  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-lg text-gray-700">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span className="text-gray-400">›</span>
          <span>{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-6 rounded-3xl border border-[#dce6dc] bg-[#fafcf9] p-6 md:flex-row md:items-center md:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[#f0f5f0] text-5xl">
              {product.categoryIcon || product.image}
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">
                {product.categoryNameBn}
              </p>

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-gray-600">
                প্রতি {unitName} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                গতকালের তুলনায় আজ দাম{' '}
                <span className={`font-semibold text-gray-700`}>
                  {isUp ? 'বেড়েছে' : flat ? 'অপরিবর্তিত —০.' : 'কমেছে'}{' '}
                  {formatPrice(product.change.pct)}%
                </span>
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="min-w-44 rounded-3xl bg-[#f0f5f0] px-8 py-5 text-center">
            <p className="text-gray-600">আজকের দাম</p>

            <p className="my-1 text-4xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </p>

            <p className="text-gray-600">টাকা / {unitName}</p>

            <p
              className={`mt-2 font-medium ${
                isUp
                  ? 'text-green-600'
                  : flat
                    ? 'text-gray-700'
                    : 'text-red-600'
              }`}
            >
              {isUp ? '▲' : flat ? '—০.' : '▼'}{' '}
              {formatPrice(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-3xl border border-[#dce6dc] bg-[#fafcf9] p-6 md:p-8">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PriceSummary
              title="সর্বনিম্ন দাম"
              price={minPrice}
              description="সবচেয়ে কম দামের বাজার"
              color="text-green-600"
              formatPrice={formatPrice}
            />

            <PriceSummary
              title="সর্বোচ্চ দাম"
              price={maxPrice}
              description="সবচেয়ে বেশি দামের বাজার"
              color="text-red-600"
              formatPrice={formatPrice}
            />

            <PriceSummary
              title="গড় দাম"
              price={avgPrice}
              description={`প্রতি ${unitName}-এর হিসাবে`}
              color="text-green-600"
              formatPrice={formatPrice}
            />
          </div>

          {/* Market Table */}
          <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-3xl border border-[#dce6dc]">
            <table className="w-full min-w-162.5 border-collapse text-left">
              <thead>
                <tr className="bg-[#fafcf9] text-gray-500">
                  <th className="px-5 py-4 font-medium">বাজার</th>
                  <th className="px-5 py-4 font-medium">বিভাগ</th>
                  <th className="px-5 py-4 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-5 py-4 text-right font-medium">সর্বোচ্চ</th>
                  <th className="px-5 py-4 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => {
                  const avg = (market.max + market.min) / 2;
                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f5f0]'}
                    >
                      <td className="border-t border-[#e1e9e1] px-5 py-4">
                        {market.market}
                      </td>

                      <td className="border-t border-[#e1e9e1] px-5 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="border-t border-[#e1e9e1] px-5 py-4 text-right">
                        {formatPrice(market.min)} টাকা
                      </td>

                      <td className="border-t border-[#e1e9e1] px-5 py-4 text-right">
                        {formatPrice(market.max)} টাকা
                      </td>

                      <td className="border-t border-[#e1e9e1] px-5 py-4 text-right font-bold">
                        {formatPrice(avg)} টাকা
                      </td>
                    </tr>
                  );
                })}

                {product.markets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-gray-500"
                    >
                      কোনো বাজারের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function PriceSummary({
  title,
  price,
  description,
  color,
  formatPrice,
}: {
  title: string;
  price: number;
  description: string;
  color: string;
  formatPrice: (price: number) => string;
}) {
  return (
    <div className="rounded-3xl border border-[#dce6dc] p-6">
      <p className="text-gray-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${color}`}>
        {formatPrice(price)} <span className="text-lg font-normal">টাকা</span>
      </p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
