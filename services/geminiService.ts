import { GoogleGenAI } from "@google/genai";
import { Agency, Case } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-flash-preview';

export const analyzeAgencyRisk = async (agency: Agency): Promise<string> => {
  try {
    const prompt = `
      Analyze this Debt Collection Agency (DCA) for FedEx.
      Agency: ${agency.name}, Status: ${agency.status}, Compliance: ${agency.complianceScore}/100, Recovery: ${agency.recoveryRate}%.
      Provide a 1-sentence risk assessment focusing on brand reputation and financial recovery.
    `;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    return "AI Analysis unavailable.";
  }
};

export const recommendDCA = async (caseDetails: string, agencies: Agency[]): Promise<string> => {
  try {
    const agencyList = agencies.map(a => `${a.name} (Score: ${a.complianceScore}, Rate: ${a.recoveryRate}%)`).join(', ');
    const prompt = `
      Case: ${caseDetails}.
      Available Agencies: ${agencyList}.
      Recommend the BEST single agency for this case to maximize recovery while ensuring compliance. Return ONLY the agency name and a 5-word reason.
    `;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
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
      Determine priority (High, Medium, Low) for debt collection case.
      Amount: ${c.amount}, Due: ${c.dueDate}, Status: ${c.status}.
      High priority if amount > 5000 or near SLA breach.
      Return ONLY the word High, Medium, or Low.
    `;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    const text = response.text?.trim();
    if (text === 'High' || text === 'Medium' || text === 'Low') return text;
    return 'Medium';
  } catch (error) {
    return 'Medium';
  }
};

export const chatWithAI = async (query: string, context: string): Promise<string> => {
  try {
    const prompt = `
      You are an AI assistant for FedEx Debt Collection governance.
      Context: ${context}
      User Query: ${query}
      Provide a professional, data-driven answer (max 2 sentences).
    `;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
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
      Analyze this debt batch and suggest a placement strategy.
      Batch Details: ${batchDetails}
      Provide a 1-sentence strategy recommendation for assigning this batch to agencies based on risk and amount.
    `;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "Strategy unavailable.";
  } catch (error) {
    return "AI Strategy unavailable.";
  }
};

// Helper to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (e.g. "data:image/jpeg;base64,")
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
        
        let mimeType = file.type;
        // Robust fallback for common types if browser detection fails
        if (!mimeType) {
             if (file.name.endsWith('.csv')) mimeType = 'text/csv';
             else if (file.name.endsWith('.pdf')) mimeType = 'application/pdf';
             else if (file.name.match(/\.(jpg|jpeg)$/i)) mimeType = 'image/jpeg';
             else if (file.name.endsWith('.png')) mimeType = 'image/png';
        }

        // Use 'gemini-3-flash-preview' as it supports multimodal inputs and is a valid model
        const model = 'gemini-3-flash-preview';
        
        const prompt = `
            You are a Data Extraction Specialist.
            Analyze the attached document (Invoice, Statement, Excel row, or List).
            Extract all distinct debt cases found.
            
            Return a JSON ARRAY of objects. Each object must have these exact keys:
            - name: Customer Name (string)
            - amt: Amount Due (number or string)
            - addr: Address (string, or empty)
            - phone: Phone Number (string, or empty)
            - email: Email (string, or empty)
            - due: Due Date (YYYY-MM-DD string, or empty)
            
            Ignore headers or irrelevant text.
            If the file is a list (like CSV or Excel), extract ALL rows.
            
            Strictly return ONLY the raw JSON string. Do NOT wrap in markdown code blocks.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data
                        }
                    },
                    { text: prompt }
                ]
            }
        });

        let text = response.text || "[]";
        
        // Sanitize markdown if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Safe Parsing
        try {
            const parsed = JSON.parse(text);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
            console.warn("JSON Parse Failed on:", text);
            // Fallback: try to find array brackets if text is messy
            const arrayMatch = text.match(/\[.*\]/s);
            if (arrayMatch) {
                return JSON.parse(arrayMatch[0]);
            }
            return [];
        }

    } catch (error) {
        console.error("Extraction Error:", error);
        return []; 
    }
};
