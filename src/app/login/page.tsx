"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    const res = await fetch("/api/auth/phone/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone })
    });
    const data = await res.json();
    setMessage(data.message ?? "OTP sent");
    setSent(true);
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/phone/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otp })
    });
    const data = await res.json();
    if (data.userId) {
      localStorage.setItem("userId", data.userId);
      router.push("/dashboard");
      return;
    }
    setMessage(data.message ?? "Invalid OTP");
  };

  return (
    <main className="mx-auto max-w-md space-y-4">
      <div className="card p-6">
        <h1 className="mb-4 text-2xl font-bold">Login / Register</h1>
        <button className="btn mb-4 w-full bg-primary">Continue with Google (setup OAuth next)</button>
        <div className="space-y-2">
          <input className="input" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {sent && <input className="input" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />}
          {!sent ? (
            <button className="btn-primary w-full" onClick={sendOtp}>Send OTP</button>
          ) : (
            <button className="btn-primary w-full" onClick={verifyOtp}>Verify OTP</button>
          )}
          <p className="text-sm text-white/80">{message}</p>
        </div>
      </div>
    </main>
  );
}
