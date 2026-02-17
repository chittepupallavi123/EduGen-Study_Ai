import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Learn", "/learn"],
  ["Ask Doubt", "/ask-doubt"],
  ["Quiz", "/quiz"],
  ["Profile", "/profile"]
];

export default function Nav() {
  return (
    <nav className="card mx-auto mb-6 flex max-w-5xl flex-wrap items-center gap-4 p-4">
      <p className="font-bold text-highlight">EduGen Study AI</p>
      {links.map(([label, href]) => (
        <Link key={href} href={href} className="text-sm text-white/90 hover:text-white">
          {label}
        </Link>
      ))}
    </nav>
  );
}
