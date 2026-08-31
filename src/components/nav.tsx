import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="border-b border-line bg-paper-raised">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold">
          Scarborough Telugu Association
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink-soft hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/donate"
          className="rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-paper-raised hover:opacity-90"
        >
          Donate
        </Link>
      </div>
    </header>
  );
}
