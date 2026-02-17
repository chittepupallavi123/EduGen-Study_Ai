import { NextResponse } from "next/server";
import { askAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { question } = await req.json();
  if (!question) {
    return NextResponse.json({ message: "question is required" }, { status: 400 });
  }

  const answer = await askAI(
    `Answer this student doubt in a simple way with one example: ${question}`,
    `Great question. Here's a simple explanation: ${question}. Example: Think of it as breaking big concept into small easy steps.`
  );

  return NextResponse.json({ answer });
}
