import React from 'react';
import BanglaDate from './BanglaDate';
import Link from 'next/link';
import Image from 'next/image';

const HeroBanner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-5 p-4 py-6 bg-white rounded-2xl border border-gray-300">
      <div className="">
        <p className="my-4 py-2 px-4 text-[12px] md:text-[15px] rounded-2xl text-green-800 bg-green-100 w-fit">
          <BanglaDate />
        </p>
        <h2 className="text-2xl md:text-5xl font-semibold mb-2">
          আজকের বাজারের দাম এক নজরে
        </h2>
        <p className="text-[#797979] mb-4 text-[12px] md:text-[15px]">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <Link
          href={'#সব-পণ্য'}
          className="py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 text-[12px] md:text-[15px]"
        >
          সব পণ্য দেখুন
        </Link>
      </div>
      <div className="grid justify-end">
        <Image
          src={'/bazar-hero.png'}
          width={200}
          height={200}
          alt="hero-banner"
          className="w-96"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
