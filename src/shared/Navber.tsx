import BanglaDate from '@/components/BanglaDate';
import NavLink from '@/components/NavLink';
import Image from 'next/image';

interface Categore {
  id: string;
  icon: string;
  nameBn: string;
  slug: string;
}

const Navber = async () => {
  const respons = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/categories',
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  const categories: Categore[] = await respons.json();
  return (
    <header className="">
      <div className="px-12 max-w-7xl mx-auto flex items-center justify-between py-2 border-b border-b-gray-200">
        <div className="flex items-center gap-2">
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
            <h2 className="text-2xl font-medium -mb-1">বাজার দর</h2>
            <p className="text-sm text-gray-500">
              <BanglaDate />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="py-2 px-4 rounded-md hover:bg-gray-200 duration-150">
            সাইন ইন
          </button>
          <button className="py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800">
            সাইন আপ
          </button>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-12 mt-2 border-b border-b-gray-200 pb-2 overflow-x-scroll md:overflow-x-hidden">
        <ul className="flex gap-2">
          {categories?.map(categore => (
            <NavLink key={categore.id} categore={categore} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navber;
