
import { GoogleGenAI } from "@google/genai";
import { MetricsPoint, Config } from "../types";

export const getGeminiInsights = async (metrics: MetricsPoint[], config: Config) => {
  // Fix: Initialized GoogleGenAI using the strictly required named parameter format.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const recentMetrics = metrics.slice(-20);
  const prompt = `
    As an AI Specialist for AgentX (an RL-powered autonomous agent), analyze the current training session:
    
    Algorithm: ${config.algorithm}
    Learning Rate: ${config.learningRate}
    Exploration Rate: ${config.explorationRate}
    
    Recent Metrics History:
    ${JSON.stringify(recentMetrics)}
    
    Provide a concise analysis (max 150 words) including:
    1. Performance trend (Is it learning or stagnating?).
    2. One specific hyperparameter adjustment suggestion.
    3. Potential risk (e.g., overfitting, vanishing rewards).
    
    Format the output in professional technical terms.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior Reinforcement Learning researcher. Your goal is to provide actionable insights for an autonomous agent's training loop.",
        temperature: 0.7,
      }
    });

    // Fix: Access the text property directly on the GenerateContentResponse object.
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "AI Analysis engine unavailable. Please check your API configuration.";
  }
};
