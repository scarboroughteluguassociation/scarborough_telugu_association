"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { InstagramIcon } from "@/components/instagram-icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const GOLD = "#c9a227";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#610917]">
      <div
        aria-hidden="true"
        className="h-12 w-full bg-repeat-x sm:h-16"
        style={{
          backgroundImage: "url('/assets/thoranam1.png')",
          backgroundSize: "auto 100%",
          backgroundPosition: "center top",
        }}
      />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="shrink-0 rounded-full p-0.5" style={{ border: `2px solid ${GOLD}` }}>
            <div className="rounded-full p-0.5" style={{ border: `1px solid ${GOLD}` }}>
              <Image
                src="/logo.jpg"
                alt="Scarborough Telugu Association logo"
                width={150}
                height={150}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
            </div>
          </div>
          <span className="font-playfair text-lg font-semibold leading-tight text-paper-raised">
            Scarborough Telugu Association
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-1 text-paper-raised transition-colors hover:bg-paper-raised hover:text-[#610917]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/donate"
              className="rounded-full bg-paper-raised px-4 py-2 text-sm font-semibold text-[#610917] hover:opacity-90"
            >
              Donate
            </Link>
            <a
              href="https://www.instagram.com/scarborough_telugu_association/"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Instagram"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-paper-raised hover:bg-paper-raised hover:text-[#610917]"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-paper-raised lg:hidden"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <Image
              src="/assets/namaste.png"
              alt=""
              width={381}
              height={650}
              aria-hidden="true"
              className="hidden h-10 w-auto shrink-0 object-contain sm:block"
            />
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-paper-raised/20 px-6 py-3 text-sm font-medium lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-2 text-paper-raised transition-colors hover:bg-paper-raised hover:text-[#610917]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
