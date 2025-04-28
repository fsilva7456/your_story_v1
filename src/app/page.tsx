'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goToOnboarding = () => {
    router.push('/onboarding');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Your Story</h1>
      <p className="text-lg mb-8 max-w-md">Create personalized stories based on your experiences and thoughts.</p>
      <button 
        onClick={goToOnboarding}
        className="px-8 py-4 text-lg bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Start Your Journey
      </button>
    </div>
  );
} 