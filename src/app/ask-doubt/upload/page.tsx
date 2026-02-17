"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

export default function AskDoubtUploadPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const summarize = async () => {
    const userId = localStorage.getItem("userId") || "demo-user";
    const res = await fetch("/api/doubt/upload", { method: "POST", body: JSON.stringify({ userId, text }) });
    const data = await res.json();
    setResult(`${data.summary}\n\nQuestions:\n${data.questions.join("\n")}`);
  };

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-3xl space-y-4">
        <div className="card space-y-2 p-5">
          <h2 className="text-xl font-semibold">Upload (MVP text simulation)</h2>
          <textarea className="input min-h-48" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste content from PDF/Word/PPT for now" />
          <button className="btn-primary" onClick={summarize}>Generate Summary & Questions</button>
        </div>
        <div className="card whitespace-pre-wrap p-5 text-sm">{result || "Summary and questions will appear here."}</div>
      </section>
    </main>
  );
}
