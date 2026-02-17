import { NextResponse } from "next/server";
import { askAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { text } = await req.json();
  if (!text) {
    return NextResponse.json({ message: "text is required" }, { status: 400 });
  }

  const summary = await askAI(`Summarize this educational text in concise points:\n${text}`, "Summary unavailable.");
  const questionsRaw = await askAI(
    `Generate 5 practice questions from the following content:\n${text}\nReturn each question on new line.`,
    "1. What is the main idea?\n2. Define key terms.\n3. Give one example.\n4. Compare two concepts.\n5. Write a short note."
  );

  const questions = questionsRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 10);

  return NextResponse.json({ summary, questions });
}
