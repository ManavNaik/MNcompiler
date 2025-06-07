import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCtgb97jwTV7cnQa7VTRygzpA0JdiRtyuo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Hi";

const result = await model.generateContent(prompt);
console.log(result.response.text());