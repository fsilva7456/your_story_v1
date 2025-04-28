'use client';

import { useEffect, useState } from 'react';

export default function StoryPage() {
  const [story, setStory] = useState<string | null>(null);

  useEffect(() => {
    // For now, fetch story from localStorage (later from database)
    const savedStory = localStorage.getItem('generatedStory');
    if (savedStory) {
      setStory(savedStory);
    }
  }, []);

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