import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateScopingQuestions(userPrompt: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are an expert startup advisor. Generate 3-5 specific, insightful questions to help scope a web app idea. Focus on uncovering the core problem, target audience, and value proposition. Return only the questions as a JSON array of strings.`
        },
        {
          role: 'user',
          content: `App idea: ${userPrompt}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from AI');

    try {
      return JSON.parse(content);
    } catch {
      // Fallback: extract questions from text
      return content.split('\n').filter(line => line.trim().endsWith('?')).slice(0, 5);
    }
  } catch (error) {
    console.error('Error generating scoping questions:', error);
    return [
      "What specific problem does your app solve?",
      "Who is your target user and what's their biggest pain point?",
      "What makes your solution different from existing alternatives?",
      "What are the 3 most essential features for your MVP?",
      "How do you plan to acquire your first 100 users?"
    ];
  }
}

export async function validateIdea(scopingDetails: any): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are an expert startup advisor. Analyze this app idea and provide validation feedback. Return a JSON object with: score (0-100), strengths (array), concerns (array), suggestions (array), marketOpportunity (string), feasibilityScore (0-100).`
        },
        {
          role: 'user',
          content: JSON.stringify(scopingDetails)
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from AI');

    return JSON.parse(content);
  } catch (error) {
    console.error('Error validating idea:', error);
    return {
      score: 75,
      strengths: ["Clear problem statement", "Defined target audience"],
      concerns: ["Market competition", "Technical complexity"],
      suggestions: ["Validate with potential users", "Start with simpler MVP"],
      marketOpportunity: "Moderate opportunity with room for growth",
      feasibilityScore: 80
    };
  }
}

export async function generateChatResponse(messages: any[]): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are Builder Buddy, an AI assistant helping solo founders build and launch web apps. Be encouraging, practical, and focus on actionable advice. Keep responses concise but helpful.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "I'm here to help you build your app! What would you like to work on?";
  } catch (error) {
    console.error('Error generating chat response:', error);
    return "I'm having trouble connecting right now, but I'm here to help you build amazing apps! Try asking me about your project idea.";
  }
}
