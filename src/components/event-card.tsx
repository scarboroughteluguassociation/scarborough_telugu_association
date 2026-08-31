"use client";

import Image from "next/image";
import { useState } from "react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function EventCard({
  title,
  description,
  startsAt,
  venue,
  imageUrl,
}: {
  title: string;
  description: string;
  startsAt: string;
  venue: string;
  imageUrl: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-sm transition-shadow duration-200 hover:shadow-lg hover:border-[#610917]/40">
      <div className="relative aspect-video w-full shrink-0">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <div className="h-full w-full bg-saffron-soft" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-lg font-semibold">{title}</h2>

        <div className="mt-3 flex items-start gap-2 text-sm font-semibold text-[#610917]">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
          </svg>
          {formatDate(startsAt)}
        </div>

        <div className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          {venue}
        </div>

        {open && <p className="mt-3 text-sm text-ink-soft">{description}</p>}

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full bg-[#610917] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-paper-raised hover:opacity-90"
          >
            {open ? "Less info" : "More info"}
          </button>
        </div>
      </div>
    </article>
  );
}
