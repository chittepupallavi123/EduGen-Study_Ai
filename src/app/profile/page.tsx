"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";

export default function ProfilePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "demo-user";
    fetch(`/api/profile?userId=${userId}`).then((r) => r.json()).then(setData);
  }, []);

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-4xl space-y-4">
        <div className="card grid gap-3 p-5 md:grid-cols-2">
          <p>Name: {data?.user?.name ?? "Student"}</p>
          <p>Phone: {data?.user?.phone ?? "-"}</p>
          <p>Streak: {data?.user?.streak ?? 0}</p>
          <p>Quiz Count: {data?.user?.quizCount ?? 0}</p>
          <p>Total Score: {data?.user?.totalScore ?? 0}</p>
          <p>Solved Questions: {data?.user?.solvedCount ?? 0}</p>
        </div>
        <div className="card p-5">
          <h3 className="mb-2 text-lg font-semibold">Generated Learn Files</h3>
          <ul className="list-disc pl-5 text-sm">
            {(data?.learnDocs ?? []).map((doc: any) => <li key={doc.id}>{doc.subject} - {doc.mode}</li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}
