'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  "What's something on your mind a lot lately?",
  "What's a problem you're trying to solve?",
  "Who or what do you care most about right now?",
  "What's a decision you've been avoiding?",
  "What would be something amazing that could happen this month?",
  "What's something you're proud of but don't talk about much?",
  "What's a fear you carry around quietly?",
  "What's a habit or pattern you want to break?",
  "Who was the last person who surprised you, and why?",
  "Imagine a totally different life—what does it look like?",
];

export default function OnboardingPage() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-episode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story.');
      }

      const data = await response.json();
      console.log('Generated Story:', data.story);
      
      // Save story to both localStorage and URL state
      if (typeof window !== 'undefined') {
        localStorage.setItem('generatedStory', data.story);
      }

      // Encode the story for URL transmission
      const encodedStory = encodeURIComponent(data.story);
      
      // Navigate to story page with the story data as a query parameter
      router.push(`/story?data=${encodedStory}`);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tell Us Your Story</h1>
      <form className="flex flex-col gap-6">
        {questions.map((question, index) => (
          <div key={index}>
            <label className="block mb-2 text-lg font-medium">{question}</label>
            <textarea
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
              rows={3}
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Answers"}
        </button>
      </form>
    </div>
  );
} 