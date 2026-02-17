import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { otpStore } from "@/app/api/auth/phone/send-otp/route";

export async function POST(req: Request) {
  const { phone, otp } = await req.json();
  const validOtp = otpStore.get(phone);

  if (!validOtp || validOtp !== otp) {
    return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
  }

  const user = await prisma.user.upsert({
    where: { phone },
    update: {},
    create: { phone, name: "New Student" }
  });

  return NextResponse.json({ userId: user.id, message: "Login successful" });
}
