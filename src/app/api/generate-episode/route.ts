import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || !Array.isArray(answers) || answers.length !== 10) {
      return NextResponse.json({ error: 'Invalid answers format.' }, { status: 400 });
    }

    // Build the prompt for Gemini
    const prompt = `
You are an award-winning graphic novel writer. Create an 8-panel story imagining the user's life one week from now. 
Use emotion, imagination, and reflection. Each panel should have:
- Panel Number
- Scene Description (1-2 sentences)
- Internal Monologue or Dialogue (optional)

User's context:
${answers.map((answer, idx) => `Q${idx + 1}: ${answer}`).join('\n')}
`;

    // Call Gemini API
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
    });

    const geminiData = await geminiResponse.json();

    const story = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({ story });
  } catch (error) {
    console.error('Error generating episode:', error);
    return NextResponse.json({ error: 'Failed to generate episode.' }, { status: 500 });
  }
} 