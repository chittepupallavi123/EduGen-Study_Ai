import { NextResponse } from "next/server";

const otpStore = new Map<string, string>();

export async function POST(req: Request) {
  const { phone } = await req.json();
  if (!phone) {
    return NextResponse.json({ message: "Phone number is required" }, { status: 400 });
  }

  const otp = "123456";
  otpStore.set(phone, otp);

  return NextResponse.json({ message: `OTP sent successfully (dev otp: ${otp})` });
}

export { otpStore };
