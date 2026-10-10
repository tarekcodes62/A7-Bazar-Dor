import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-gray-50 h-[65vh] py-6 flex items-center justify-center gap-2 flex-col">
      <h2 className="text-6xl">🧺</h2>
      <h2 className="text-2xl font-medium">পাতাটি খুঁজে পাওয়া যায়নি</h2>
      <p className="text-gray-500 font-normal">
        আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনো ছিল না।
      </p>
      <Link
        href="/"
        className="py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800"
      >
        হোম পেজে যান
      </Link>
    </div>
  );
}
