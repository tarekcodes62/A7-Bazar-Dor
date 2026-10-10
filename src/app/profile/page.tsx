'use client';
import { signOut, updateUser, useSession } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [formData, setFormData] = useState({
    name: user?.name || '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await updateUser({
      name: formData.name,
    });
    if (data) {
      toast.success('নাম সফলভাবে হালনাগাদ হয়েছে।');
      redirect('/');
    }
    if (error) {
      toast.error(error?.message || 'Faild');
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-160 mx-auto my-6">
        <h2 className="text-4xl">আমার প্রোফাইল</h2>
        <p className="text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-3 bg-white my-6 p-4 rounded-md shadow">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <h2 className="bg-green-600 px-5 py-1 rounded-2xl text-white font-semibold text-2xl">
              T
            </h2>
            <div className="">
              <h2 className="text-xl font-medium">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={async () => {
              const { data, error } = await signOut();
              if (data) {
                toast.success('সফলভাবে সাইন আউট হয়েছে।');
                redirect('/');
              }
              if (error) {
                toast.error(error?.message || 'Faild');
              }
            }}
            className="flex items-center gap-2
              rounded-lg px-2 py-2 text-lg text-red-500
              hover:bg-red-600 hover:text-white border border-red-600 duration-300"
          >
            <LogOut size={21} />
            সাইন আউট
          </button>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-2xl mb-2">নাম হালনাগাদ করুন</h2>
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            {/* Name Field */}
            <div>
              <label className="block text-lg mb-1">নাম</label>
              <input
                type="text"
                name="name"
                placeholder="যেমন: তারেক রহমান"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className=" bg-[#038543] hover:bg-[#026b36] text-white font-medium py-3 px-4 rounded-lg transition-colors text-base cursor-pointer"
            >
              নাম হালনাগাদ করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
