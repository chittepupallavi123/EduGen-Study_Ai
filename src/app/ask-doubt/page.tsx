import Link from "next/link";
import Nav from "@/components/Nav";

export default function AskDoubtPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
        <Link href="/ask-doubt/chat" className="card bg-accentWine p-8 text-center text-2xl font-semibold">AI Chat</Link>
        <Link href="/ask-doubt/upload" className="card bg-accentOlive p-8 text-center text-2xl font-semibold">File Upload</Link>
      </section>
    </main>
  );
}
