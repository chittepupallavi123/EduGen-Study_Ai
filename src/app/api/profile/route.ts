import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "userId is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const learnDocs = await prisma.learnDocument.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });

  return NextResponse.json({ user, learnDocs });
}
