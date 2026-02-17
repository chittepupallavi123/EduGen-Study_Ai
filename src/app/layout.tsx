import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduGen Study AI",
  description: "AI learning, doubts, and quiz platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="p-4 md:p-8">{children}</body>
    </html>
  );
}
