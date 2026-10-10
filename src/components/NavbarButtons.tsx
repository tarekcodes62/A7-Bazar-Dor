'use client';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';

const NavbarButtons = () => {
  const { data: session } = useSession();
  const user = session?.user;
  if (user) {
    return <ProfileDropdown user={user} />;
  }
  return (
    <div className="flex items-center gap-2">
      <Link href={'/signin'}>
        <button className="text-[10px] md:text-[16px] py-2 px-4 rounded-md hover:bg-gray-200 duration-150">
          সাইন ইন
        </button>
      </Link>
      <Link href={'/signup'}>
        <button className="text-[10px] md:text-[16px] py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800">
          সাইন আপ
        </button>
      </Link>
    </div>
  );
};

export default NavbarButtons;
