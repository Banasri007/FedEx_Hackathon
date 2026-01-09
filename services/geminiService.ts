// services/geminiService.ts

/**
 * Mocked Gemini service for frontend demo.
 * In production, these would call a secure backend API.
 */

// Chat / general AI response
export async function chatWithAI(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Gemini (mock): Response generated for "${prompt}"`);
    }, 800);
  });
}

// Alias (used in some places)
export async function callGemini(prompt: string): Promise<string> {
  return chatWithAI(prompt);
}

// Agency risk analysis
export async function analyzeAgencyRisk(agencyName: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Risk Analysis (mock): ${agencyName} shows medium risk due to delayed settlements.`
      );
    }, 700);
  });
}

// Case prioritization
export async function prioritizeCases(caseCount: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Case Priority (mock): ${caseCount} cases categorized into high, medium, and low priority.`
      );
    }, 700);
  });
}

// SLA insight generation
export async function generateSLAInsights(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "SLA Insight (mock): Optimizing agency assignment can reduce SLA breaches by 18%."
      );
    }, 600);
  });
}
