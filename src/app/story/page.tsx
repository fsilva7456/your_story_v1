'use client';

import { useEffect, useState } from 'react';

type Panel = {
  panelNumber: number;
  sceneDescription: string;
  internalMonologue?: string;
  dialogue?: string;
  imageIdea?: string;
};

export default function StoryPage() {
  const [panels, setPanels] = useState<Panel[]>([]);

  useEffect(() => {
    const rawStory = localStorage.getItem('generatedStory');
    if (!rawStory) return;

    // Parse the Gemini output
    const parsedPanels: Panel[] = [];
    const panelSections = rawStory.split(/\*\*Panel \d+\*\*/g).filter(Boolean);

    panelSections.forEach((section, idx) => {
      // Using lookahead pattern instead of 's' flag to match across multiple lines
      const sceneMatch = section.match(/\*\*Scene Description:\*\*([\s\S]*?)(?=\*\*|$)/);
      const monologueMatch = section.match(/\*\*Internal Monologue:\*\*([\s\S]*?)(?=\*\*|$)/);
      const dialogueMatch = section.match(/\*\*Dialogue:\*\*([\s\S]*?)(?=\*\*|$)/);
      const imageMatch = section.match(/\*\*Image:\*\*([\s\S]*?)(?=\*\*|$)/);

      parsedPanels.push({
        panelNumber: idx + 1,
        sceneDescription: sceneMatch ? sceneMatch[1].trim() : '',
        internalMonologue: monologueMatch ? monologueMatch[1].trim() : undefined,
        dialogue: dialogueMatch ? dialogueMatch[1].trim() : undefined,
        imageIdea: imageMatch ? imageMatch[1].trim() : undefined,
      });
    });

    setPanels(parsedPanels);
  }, []);

  if (panels.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No story found. Please complete onboarding first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Story</h1>
      <div className="flex flex-col gap-8">
        {panels.map((panel) => (
          <div key={panel.panelNumber} className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Panel {panel.panelNumber}</h2>
            <p className="text-gray-700 mb-2"><strong>Scene:</strong> {panel.sceneDescription}</p>
            {panel.internalMonologue && (
              <p className="text-indigo-600 mb-2 italic">"{panel.internalMonologue}"</p>
            )}
            {panel.dialogue && (
              <p className="text-green-700 mb-2">Dialogue: {panel.dialogue}</p>
            )}
            {panel.imageIdea && (
              <p className="text-gray-500 text-sm">[Image Idea: {panel.imageIdea}]</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 