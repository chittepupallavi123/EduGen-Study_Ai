"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

type Msg = { role: "user" | "assistant"; content: string };

export default function AskDoubtChatPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  const ask = async () => {
    const userId = localStorage.getItem("userId") || "demo-user";
    const res = await fetch("/api/doubt/chat", { method: "POST", body: JSON.stringify({ userId, question }) });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "user", content: question }, { role: "assistant", content: data.answer }]);
    setQuestion("");
  };

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-3xl space-y-4">
        <div className="card max-h-[420px] space-y-3 overflow-auto p-4">
          {messages.map((m, idx) => (
            <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
              <p className="inline-block rounded-xl bg-black/30 px-3 py-2 text-sm">{m.content}</p>
            </div>
          ))}
        </div>
        <div className="card flex gap-2 p-3">
          <input className="input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask your doubt..." />
          <button className="btn-primary" onClick={ask}>Send</button>
        </div>
      </section>
    </main>
  );
}
