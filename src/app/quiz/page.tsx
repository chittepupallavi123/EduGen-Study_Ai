"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

export default function QuizPage() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);

  const generateQuiz = async () => {
    const userId = localStorage.getItem("userId") || "demo-user";
    const res = await fetch("/api/quiz/generate", { method: "POST", body: JSON.stringify({ userId, subject, topics }) });
    const data = await res.json();
    setQuestions(data.questions || []);
  };

  return (
    <main>
      <Nav />
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        <div className="card space-y-3 p-5">
          <input className="input" placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <textarea className="input min-h-24" placeholder="Enter topics" value={topics} onChange={(e) => setTopics(e.target.value)} />
          <button className="btn-primary" onClick={generateQuiz}>Generate Quiz</button>
        </div>
        <div className="card max-h-[500px] space-y-2 overflow-auto p-5 text-sm">
          {questions.length === 0
            ? "Quiz questions will appear here."
            : questions.map((q, i) => <p key={i}>{i + 1}. {q.prompt}</p>)}
        </div>
      </div>
    </main>
  );
}
