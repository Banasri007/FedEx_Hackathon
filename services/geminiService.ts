import { GoogleGenAI } from "@google/genai";
import { Agency, Case } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Using Flash for high-speed tasks (Extraction, Chat)
const FAST_MODEL = 'gemini-3-flash-preview';
// Using Pro for complex reasoning (Risk Analysis, Strategy, Recommendations)
const REASONING_MODEL = 'gemini-3-pro-preview';

export const analyzeAgencyRisk = async (agency: Agency): Promise<string> => {
  try {
    const prompt = `
      Perform a deep reasoning analysis of this Debt Collection Agency (DCA) for FedEx Corporate Finance.
      Agency: ${agency.name}
      Status: ${agency.status}
      Compliance: ${agency.complianceScore}/100
      Recovery Rate: ${agency.recoveryRate}%
      Region: ${agency.region}
      
      Provide a sophisticated, 1-sentence risk assessment regarding brand reputation, regulatory compliance, and financial recovery potential.
    `;
    const response = await ai.models.generateContent({
      model: REASONING_MODEL,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Risk Analysis Error:", error);
    return "AI Analysis unavailable.";
  }
};

export const recommendDCA = async (caseDetails: string, agencies: Agency[]): Promise<string> => {
  try {
    const agencyList = agencies.map(a => `${a.name} (Score: ${a.complianceScore}, Rate: ${a.recoveryRate}%)`).join(', ');
    const prompt = `
      Case Context: ${caseDetails}
      Available Agency Pool: ${agencyList}
      
      Identify the optimal agency. Return ONLY the agency name and a 5-word rationale.
    `;
    const response = await ai.models.generateContent({
      model: REASONING_MODEL,
      contents: prompt,
    });
    return response.text || "Recommendation unavailable.";
  } catch (error) {
    return "AI Recommendation unavailable.";
  }
};

export const prioritizeCase = async (c: Case): Promise<'High' | 'Medium' | 'Low'> => {
  try {
    const prompt = `
      Debt Recovery Priority Logic:
      Amount: ${c.amount}, Due: ${c.dueDate}, Status: ${c.status}.
      High priority if > 5000 or near SLA breach.
      Return ONLY: High, Medium, or Low.
    `;
    const response = await ai.models.generateContent({
      model: FAST_MODEL,
      contents: prompt,
    });
    const text = response.text?.trim();
    if (text?.includes('High')) return 'High';
    if (text?.includes('Medium')) return 'Medium';
    if (text?.includes('Low')) return 'Low';
    return 'Medium';
  } catch (error) {
    return 'Medium';
  }
};

export const chatWithAI = async (query: string, context: string): Promise<string> => {
  try {
    const prompt = `
      Role: FedEx Debt Collection Governance Assistant.
      Context: ${context}
      User Query: ${query}
      Provide a concise, professional answer (max 2 sentences).
    `;
    const response = await ai.models.generateContent({
      model: FAST_MODEL,
      contents: prompt,
    });
    return response.text || "I cannot answer that right now.";
  } catch (error) {
    return "AI Service unavailable.";
  }
};

export const generateBatchStrategy = async (batchDetails: string): Promise<string> => {
  try {
    const prompt = `
      Devise an enterprise placement strategy for this portfolio:
      ${batchDetails}
      Return a 1-sentence strategic recommendation.
    `;
    const response = await ai.models.generateContent({
      model: REASONING_MODEL,
      contents: prompt,
    });
    return response.text || "Strategy unavailable.";
  } catch (error) {
    return "AI Strategy unavailable.";
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const extractDetailsFromDoc = async (file: File): Promise<any[]> => {
    try {
        const base64Data = await fileToBase64(file);
        let mimeType = file.type || 'application/octet-stream';

        const prompt = `
            Analyze the provided document (Invoice/Statement).
            Extract all distinct debt cases.
            Return a JSON ARRAY of objects with: name, amt (number), addr, phone, email, due (YYYY-MM-DD).
            Strictly return raw JSON only.
        `;

        const response = await ai.models.generateContent({
            model: FAST_MODEL,
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64Data } },
                    { text: prompt }
                ]
            }
        });

        let text = response.text || "[]";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const parsed = JSON.parse(text);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
            const arrayMatch = text.match(/\[.*\]/s);
            if (arrayMatch) return JSON.parse(arrayMatch[0]);
            return [];
        }
    } catch (error) {
        console.error("Extraction Error:", error);
        return []; 
    }
};
