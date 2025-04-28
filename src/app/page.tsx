'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/onboarding');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">Redirecting to onboarding...</p>
    </div>
  );
} 