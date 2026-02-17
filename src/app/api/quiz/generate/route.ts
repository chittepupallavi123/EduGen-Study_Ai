import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { askAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { userId, subject, topics } = await req.json();
  if (!userId || !subject) {
    return NextResponse.json({ message: "userId and subject are required" }, { status: 400 });
  }

  const fallbackQuestions = Array.from({ length: 20 }).map((_, i) => ({
    prompt: `(${subject}) Sample question ${i + 1} on ${topics || "core concepts"}`,
    options: "A|B|C|D",
    answer: "A",
    explanation: "Sample explanation"
  }));

  const raw = await askAI(
    `Generate 20 MCQ questions for ${subject} on topics ${topics}. Return JSON array with keys prompt, options(array), answer, explanation.`,
    JSON.stringify(fallbackQuestions)
  );

  let questions: any[] = fallbackQuestions;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      questions = parsed.map((q: any) => ({
        prompt: q.prompt,
        options: Array.isArray(q.options) ? q.options.join("|") : q.options || "A|B|C|D",
        answer: q.answer || "A",
        explanation: q.explanation || ""
      }));
    }
  } catch {
    questions = fallbackQuestions;
  }

  const quiz = await prisma.quiz.create({
    data: {
      userId,
      subject,
      topics: topics || "",
      questions: {
        create: questions.slice(0, 30).map((q) => ({
          prompt: q.prompt,
          options: typeof q.options === "string" ? q.options : "A|B|C|D",
          answer: q.answer,
          explanation: q.explanation
        }))
      }
    },
    include: { questions: true }
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      quizCount: { increment: 1 },
      solvedCount: { increment: quiz.questions.length }
    }
  }).catch(() => null);

  return NextResponse.json({ quizId: quiz.id, questions: quiz.questions });
}
