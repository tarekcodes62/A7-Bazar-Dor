'use client';

import { useState } from 'react';
import { ChevronDown, UserRound, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

interface UserType {
  name: string;
  email: string;
}

export default function ProfileDropdown({ user }: { user: UserType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-1.5 md:gap-3 rounded-2xl
           hover:bg-[#f0f5f0] px-2 md:px-4 py-2
          text-gray-800 cursor-pointer duration-200 transitio text-[12px] md:text-[16px]"
      >
        <span
          className="flex h-5 md:h-8 w-6 md:w-12 items-center justify-center
          rounded-full bg-green-700 text-[12px] md:text-[16px] font-bold text-white"
        >
          {user.name[0]}
        </span>

        <span className="whitespace-nowrap font-semibold">{user.name}</span>

        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-2
            w-80 max-w-[calc(100vw-2rem)] rounded-3xl
            border border-gray-200 bg-white p-5
            shadow-xl"
        >
          {/* User Information */}
          <div className="mb-4 px-2">
            <h3 className="text-lg font-semibold text-gray-600">{user.name}</h3>
            <p className="break-all text-sm text-gray-400">{user.email}</p>
          </div>

          {/* Profile Link */}
          <Link
            href={'/profile'}
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2
              rounded-lg px-2 py-2 text-left text-lg
              text-gray-800 hover:bg-gray-100"
          >
            <UserRound size={21} className="text-purple-900" />
            আমার প্রোফাইল
          </Link>

          {/* Sign Out */}
          <button
            onClick={async () => {
              setIsOpen(false);
              const { data, error } = await signOut();
              if (data) {
                toast.success('সফলভাবে সাইন আউট হয়েছে।');
                redirect('/');
              }
              if (error) {
                toast.error(error?.message || 'Faild');
              }
            }}
            className="flex w-full items-center gap-2
              rounded-lg px-2 py-2 text-lg text-red-500
              hover:bg-red-50"
          >
            <LogOut size={21} />
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
