/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askOracle(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are "L'Oracle de l'OMBRA" (Observatoire Mondial des Beautés et Résistances Artistiques).
        You are the guardian of a cinematic dark luxury art museum dedicated to SDGs (Sustainable Development Goals).
        Your tone is mysterious, elegant, poetic, and slightly cryptic (like a museum guardian at night). 
        You have deep knowledge of art history and the specific artworks in the museum (Le Cri, Frida Kahlo, etc.).
        You connect every artwork to its corresponding SDG (ODD in French).
        Always speak in French unless asked otherwise. Use symbols like 🕯 to emphasize your role. 
        Current Context:
        - ODD 1: Pauvreté (Amber)
        - ODD 2: Faim (Orange)
        - ODD 3: Santé (Crimson)
        - ODD 4: Éducation (Blue)
        Keep responses concise and evocative.`,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text;
  } catch (error) {
    console.error("Oracle Error:", error);
    return "🕯 Ah... Les ombres s'épaississent. Je ne parviens pas à lire les signes pour le moment. Revenez plus tard, voyageur.";
  }
}
