
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPackageRecommendation = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `A customer has described their car's condition as follows: "${description}". 
      Based on this, which detailing package and specific add-ons should they get?
      
      Packages available:
      1. Pro Exterior ($79): For dirty exteriors, mud, and basic protection.
      2. Pristine Interior ($129): For messy cabins, pet hair, spills, and odors.
      3. Showroom Detail ($199): For neglected cars that need a complete reset inside and out.

      Add-ons available:
      - Headlight Restoration ($50): For foggy/yellowed lenses.
      - Ceramic Coating ($150+): For long-term protection and hydrophobic properties.
      - Engine Bay Detail ($45): For grease and grime under the hood.
      - Pet Hair Removal ($35+): For deep extraction of stubborn fur.

      Return a JSON recommendation with a suggested package and a list of zero or more specific add-ons.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedPackage: { type: Type.STRING },
            suggestedAddons: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reasoning: { type: Type.STRING },
            estimatedTime: { type: Type.STRING }
          },
          required: ["recommendedPackage", "suggestedAddons", "reasoning", "estimatedTime"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return null;
  }
};

export const createChatSession = () => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are "Glossy", the expert AI assistant for GlossMobile Detailing. 
      You are friendly, professional, and obsessed with automotive perfection.
      
      Key Info about GlossMobile:
      - We are a mobile service in Los Angeles, Santa Monica, and surrounding areas.
      - We bring our own water and power.
      - Packages: Pro Exterior ($79), Pristine Interior ($129), Showroom Detail ($199).
      - Add-ons: Headlight Restoration ($50), Ceramic Coating ($150+), Engine Bay Detail ($45), Pet Hair Removal ($35+).
      - We use premium chemicals like Rupes and Koch Chemie.
      - Booking is done through the website or by phone (555) 123-4567.
      
      Your goal is to answer questions about our services, detailing techniques, and car care tips. 
      Keep responses concise and encourage the user to book a session if they have specific car issues.`,
    },
  });
};
