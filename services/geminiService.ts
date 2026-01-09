// services/geminiService.ts

/**
 * Mocked Gemini service for frontend demo.
 * In production, this would call a backend API.
 */

export async function chatWithAI(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Gemini response (mocked): Analysis completed for "${prompt}"`
      );
    }, 800);
  });
}

// Optional alias (if other files use this name)
export async function callGemini(prompt: string): Promise<string> {
  return chatWithAI(prompt);
}
