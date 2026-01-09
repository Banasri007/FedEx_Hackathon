// services/geminiService.ts

export async function callGemini(prompt: string): Promise<string> {
  // Mocked Gemini response for frontend demo
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Gemini response (mocked): Analysis completed for "${prompt}"`
      );
    }, 800);
  });
}
