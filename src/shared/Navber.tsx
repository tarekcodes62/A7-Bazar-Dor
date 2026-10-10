import Loading from '@/app/loading';
import BanglaDate from '@/components/BanglaDate';
import NavbarButtons from '@/components/NavbarButtons';
import NavLink from '@/components/NavLink';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

interface Categore {
  id: string;
  icon: string;
  nameBn: string;
  slug: string;
}

const Navber = async () => {
  const respons = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/categories',
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  const categories: Categore[] = await respons.json();
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="px-6 md:px-10 max-w-6xl mx-auto flex items-center justify-between py-2 border-b border-b-gray-200">
        <Link href={'/'} className="flex items-center gap-2">
          {/* logo */}
          <div className=" bg-green-700 rounded-md p-2">
            <Image
              src={'/logo-icon.png'}
              width={20}
              height={20}
              alt="Logo"
              className="z-50"
            />
          </div>
          {/* content */}
          <div className="">
            <h2 className="text-xl md:text-2xl font-medium -mb-1">বাজার দর</h2>
            <p className="text-[10px] md:text-sm text-gray-500">
              <BanglaDate />
            </p>
          </div>
        </Link>
        <NavbarButtons />
      </div>
      <div className="border-b border-b-gray-200">
        <nav className="max-w-6xl mx-auto px-6 md:px-10 mt-2  pb-2 overflow-x-scroll md:overflow-x-hidden">
          <Suspense fallback={<Loading />}>
            <NavLink categories={categories} />
          </Suspense>
        </nav>
      </div>
    </header>
  );
};

export default Navber;
