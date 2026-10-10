import { notFound } from 'next/navigation';
import Marquee from 'react-fast-marquee';

interface ProductType {
  categoryNameBn: string;
  image: string;
  change: { dir: string; pct: number };
  id: number;
  today: number;
  nameBn: string;
  slug: string;
  unit: string;
}
const unitMap: Record<string, string> = {
  kg: 'কেজি',
  gram: 'গ্রাম',
  litre: 'লিটার',
  piece: 'টি',
  dozen: 'ডজন',
  bag: 'বস্তা',
};

const Marquees = async () => {
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
  const categoryFilter = categories.filter(
    cate => cate.change.dir === 'up' || cate.change.dir === 'down',
  );
  return (
    <Marquee speed={150} direction="left" pauseOnHover={true} gradient={false}>
      <div className="flex">
        {categoryFilter?.map(cate => {
          const isUp = cate.change.dir.toLowerCase() === 'up';
          return (
            <div
              key={cate.id}
              className="flex items-center gap-2 border-r border-r-gray-300 px-4 py-1"
            >
              <p>{cate.image}</p>
              <h2>{cate.nameBn}</h2>
              <p className="text-gray-600">
                {cate.today.toLocaleString('bn-BD')} টাকা /
                {unitMap[cate.unit] ?? cate.unit}
              </p>
              <span
                className={` text-sm ${
                  isUp ? 'text-green-500' : 'text-red-600'
                }`}
              >
                {isUp ? '▲' : '▼'} {cate.change.pct.toLocaleString('bn-BD')}%
              </span>
            </div>
          );
        })}
      </div>
    </Marquee>
  );
};

export default Marquees;
