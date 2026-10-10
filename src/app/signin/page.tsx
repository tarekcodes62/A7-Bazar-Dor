'use client';

import { signIn } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SigninForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission and console log data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: '/',
    });
    if (data) {
      toast.success('সফলভাবে সাইন ইন হয়েছে।');
      redirect('/');
    }
    if (error) {
      toast.error(error?.message || 'Faild');
    }
  };

  // handle google
  const handelGoogle = async () => {
    const { data, error } = await signIn.social({
      provider: 'google',
    });
    if (data) {
      toast.success('সফলভাবে সাইন ইন হয়েছে।');
      redirect('/');
    }
    if (error) {
      toast.error(error?.message || 'Faild');
    }
  };

  // handle github
  const handleGithub = async () => {
    const { data, error } = await signIn.social({
      provider: 'github',
    });
    if (data) {
      toast.success('সফলভাবে সাইন ইন হয়েছে।');
      redirect('/');
    }
    if (error) {
      toast.error(error?.message || 'Faild');
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6f3] flex flex-col justify-center items-center p-4 font-sans text-gray-800">
      {/* Title Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">সাইন ইন</h1>
        <p className="text-gray-600 text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-120">
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2">ইমেইল</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-2">পাসওয়ার্ড</label>
            <input
              type="password"
              name="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#038543] hover:bg-[#026b36] text-white font-medium py-3 px-4 rounded-lg transition-colors text-base"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-500">
            অথবা
          </span>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Google Button */}
          <button
            onClick={handelGoogle}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-3 text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          {/* GitHub Button */}
          <button
            onClick={handleGithub}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-3 text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">অ্যাকাউন্ট নেই? </span>
          <Link
            href="/signup"
            className="text-[#038543] font-medium hover:underline underline-offset-2"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6 text-center text-sm">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
