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

// Default answers to help users get started
const defaultAnswers = [
  "I've been thinking a lot about my career direction and what makes me feel fulfilled.",
  "I'm trying to find a better work-life balance that gives me more time for creative pursuits.",
  "My family and my personal growth are my biggest priorities right now.",
  "Whether to take that course I've been looking at for months - it's expensive but could open new doors.",
  "Landing a project that really excites me or reconnecting with someone important from my past.",
  "How I managed to teach myself coding despite having no formal background in it.",
  "That I'm falling behind my peers or missing out on opportunities because I'm playing it too safe.",
  "Constantly checking my phone first thing in the morning instead of taking time for myself.",
  "My old college roommate - they've completely transformed their life in a way I never expected.",
  "Living in a coastal town, working remotely, and spending evenings painting or learning to sail.",
];

export default function OnboardingPage() {
  const [answers, setAnswers] = useState<string[]>(defaultAnswers);
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
      
      // Save story to localStorage first (as a reliable backup)
      if (typeof window !== 'undefined') {
        localStorage.setItem('generatedStory', data.story);
      }

      // Navigate to story page without query parameter
      // The story component will read from localStorage
      router.push('/story');
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
              placeholder="Share your thoughts here..."
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