import Link from 'next/link';
import React from 'react';

interface ProductType {
  categoryNameBn: string;
  image: string;
  change: { dir: string; pct: number };
  id: number;
  today: number;
  nameBn: string;
  slug: string;
}

interface ProductProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductProps) => {
  const isUp = product.change.dir.toLowerCase() === 'up';
  const flat = product.change.dir.toLowerCase() === 'flat';

  return (
    <Link
      href={`/product/${product.slug}`}
      className="w-full rounded-[28px] border border-[#dce5dc] bg-[#fbfdfb] py-2 px-5 sm:p-6"
    >
      {/* Product information */}
      <div className="flex items-center gap-4">
        <div className="flex h-14.5 w-14.5 shrink-0 items-center justify-center rounded-[20px] bg-[#f0f4ef] p-2">
          <span className="text-4xl rounded-xl">{product.image}</span>
        </div>

        <div className="min-w-0">
          <h2 className="text-xl text-[#17251e] font-medium">
            {product.nameBn}
          </h2>

          <p className="text-base text-[#738176] text-[14px]">প্রতি কেজি</p>
        </div>
      </div>

      {/* Price information */}
      <div className="mt-4">
        <p className="mb-1 text-base text-[#738176]">আজকের দাম</p>

        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-semibold text-[#111b15]">
            {product.today.toLocaleString('bn-BD')}{' '}
            <span className="text-[#6b716c] font-normal text-xl">টাকা</span>
          </p>

          <span
            className={`shrink-0 rounded-full px-3 py-2 text-sm font-medium ${
              isUp
                ? 'bg-[#f0f5f0] text-green-500'
                : flat
                  ? 'text-gray-500 bg-[#f0f5f0]'
                  : 'bg-[#f0f5f0] text-red-600'
            }`}
          >
            {isUp ? '▲' : flat ? '—০.' : '▼'}{' '}
            {product.change.pct.toLocaleString('bn-BD')}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
