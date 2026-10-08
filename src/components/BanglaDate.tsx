'use client';

import { useEffect, useState } from 'react';

export default function BanglaDate() {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();

      const banglaDate = new Intl.DateTimeFormat('bn-BD', {
        timeZone: 'Asia/Dhaka',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(today);

      setDate(banglaDate);
    };

    updateDate();
  }, []);

  if (!date) {
    return null;
  }

  return <>{date}</>;
}
