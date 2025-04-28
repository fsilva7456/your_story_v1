'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function StoryContent() {
  const [story, setStory] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // First try to get story from URL parameter
    const urlData = searchParams.get('data');
    
    if (urlData) {
      // Decode the story data from URL
      try {
        const decodedStory = decodeURIComponent(urlData);
        setStory(decodedStory);
        return;
      } catch (e) {
        console.error('Error decoding story from URL:', e);
      }
    }
    
    // Fallback: try to get story from localStorage
    if (typeof window !== 'undefined') {
      const savedStory = localStorage.getItem('generatedStory');
      if (savedStory) {
        setStory(savedStory);
      }
    }
  }, [searchParams]);

  if (!story) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No story found. Please complete onboarding first.</p>
      </div>
    );
  }

  // Split story by panel sections if needed
  const panels = story.split(/Panel \d+:/).filter((panel) => panel.trim() !== '');

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Story</h1>
      <div className="flex flex-col gap-8">
        {panels.map((panel, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Panel {index + 1}</h2>
            <p className="text-gray-700 whitespace-pre-line">{panel.trim()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StoryPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <StoryContent />
    </Suspense>
  );
} 