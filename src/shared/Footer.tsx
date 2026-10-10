import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between items-center py-8 px-12">
        <p className="text-gray-600">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-gray-600">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
