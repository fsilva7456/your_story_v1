'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Add a small delay to ensure the router is fully initialized
    const redirectTimer = setTimeout(() => {
      router.push('/onboarding');
    }, 100);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">Redirecting to onboarding...</p>
    </div>
  );
} 