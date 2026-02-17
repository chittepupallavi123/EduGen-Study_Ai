"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

export default function LearnPage() {
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState<"whole" | "topics">("whole");
  const [topics, setTopics] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const userId = localStorage.getItem("userId") || "demo-user";
    const res = await fetch("/api/learn/generate", {
      method: "POST",
      body: JSON.stringify({ subject, mode, topics, userId })
    });
    const data = await res.json();
    setResult(data.content);
  };

  return (
    <main>
      <Nav />
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        <div className="card space-y-3 p-5">
          <h2 className="text-xl font-semibold">Learn Generator</h2>
          <input className="input" placeholder="Enter subject name" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <div className="flex gap-4 text-sm">
            <label><input type="radio" checked={mode === "whole"} onChange={() => setMode("whole")} /> Whole Subject</label>
            <label><input type="radio" checked={mode === "topics"} onChange={() => setMode("topics")} /> Topics</label>
          </div>
          {mode === "topics" && (
            <textarea className="input min-h-24" placeholder="Enter topics, comma separated" value={topics} onChange={(e) => setTopics(e.target.value)} />
          )}
          <button className="btn-primary" onClick={generate}>Generate</button>
        </div>
        <div className="card whitespace-pre-wrap p-5 text-sm text-white/90">{result || "Generated learning plan appears here."}</div>
      </div>
    </main>
  );
}
