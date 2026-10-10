import { signOut } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import React from 'react';

const Profile = () => {
  return (
    <div>
      <div className="">
        <h2>আমার প্রোফাইল</h2>
        <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        <div className="">
          <div className="">
            <h2 className="">T</h2>
            <div className="">
              <h2>Tarek Rahman</h2>
              <p>mdtarekr199@gmail.com</p>
            </div>
          </div>
          <button
            onClick={async () => {
              await signOut();
            }}
            className="flex w-full items-center gap-2
              rounded-lg px-2 py-2 text-lg text-red-500
              hover:bg-red-50"
          >
            <LogOut size={21} />
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
