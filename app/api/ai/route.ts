import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, mode = 'build', context = '' } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'Gemini API key is not configured. Please configure your API key in the Settings > Secrets panel.',
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let systemInstruction = 'You are CodeSphere AI, an expert software engineering, firmware architecture, and coding assistant. You write clean, robust, production-grade code without any censorship limitations for developers.';
    
    if (mode === 'learn') {
      systemInstruction = 'You are CodeSphere AI Learn Tutor. Explain programming concepts clearly, step by step, with practical examples and best practices.';
    } else if (mode === 'debug') {
      systemInstruction = 'You are CodeSphere AI Code Doctor. Analyze source code and compiler errors meticulously, identify syntax or logic bugs, explain why they occur, and provide corrected code.';
    } else if (mode === 'firmware') {
      systemInstruction = 'You are CodeSphere Embedded Firmware Engineer AI. Assist with Arduino, ESP32 ESP-IDF, partition tables, GPIO configuration, and binary builds.';
    }

    const fullPrompt = context ? `Context / Code:\n\`\`\`\n${context}\n\`\`\`\n\nRequest:\n${prompt}` : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: fullPrompt,
      config: {
        systemInstruction,
      },
    });

    const text = response.text || 'No response generated.';

    return NextResponse.json({ result: text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
