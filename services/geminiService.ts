
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPlantAdvice = async (query: string, base64Image?: string) => {
  const model = 'gemini-3-flash-preview';
  
  const contents: any[] = [{ text: query }];
  if (base64Image) {
    contents.unshift({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: contents },
      config: {
        systemInstruction: "You are 'Rooty', the expert AI botanist for the 'Rooted with Me' social platform. Your goal is to help users identify plants, diagnose diseases, and give planting advice. Be friendly, encouraging, and concise. Always suggest specific care tips."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my root network. Please try again in a moment!";
  }
};

export const getPlantingRecommendations = async (location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the location "${location}", what are the top 3 plants that would thrive there? Provide their names and a brief reason why.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              reason: { type: Type.STRING },
              creditsValue: { type: Type.NUMBER, description: "Suggested credit reward for planting this (100-500)" }
            },
            required: ["name", "reason", "creditsValue"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};
