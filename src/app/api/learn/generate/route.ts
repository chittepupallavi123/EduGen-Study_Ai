import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { askAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { userId, subject, mode, topics } = await req.json();
  if (!userId || !subject) {
    return NextResponse.json({ message: "userId and subject are required" }, { status: 400 });
  }

  const prompt = `Create easy topic-wise learning path for subject ${subject}. Mode: ${mode}. Topics: ${topics || "all"}. Include examples, practice tasks, and visual recommendations (graphs/tables/pie-chart if needed).`;
  const content = await askAI(
    prompt,
    `Overview: ${subject}\nLearning Path: Week 1 basics, Week 2 intermediate, Week 3 advanced\nExamples: Real world examples included.\nVisuals: Use pie chart for topic weightage.`
  );

  await prisma.learnDocument.create({
    data: {
      userId,
      subject,
      mode,
      topics: topics || "",
      content
    }
  });

  return NextResponse.json({ content });
}
