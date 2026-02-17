import Link from "next/link";
import Nav from "@/components/Nav";

const cards = [
  { title: "Learn", href: "/learn", color: "bg-primary" },
  { title: "Ask Doubt", href: "/ask-doubt", color: "bg-secondary" },
  { title: "Quiz", href: "/quiz", color: "bg-accentGreen" }
];

export default function DashboardPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className={`card p-8 text-center text-2xl font-semibold ${card.color}`}>
            {card.title}
          </Link>
        ))}
      </section>
    </main>
  );
}
