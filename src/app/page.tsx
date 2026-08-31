import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="mb-3 font-mono text-xs tracking-wide text-teal uppercase">
        Serving the Telugu community in Scarborough
      </p>
      <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
        Scarborough Telugu Association
      </h1>
      <p className="mt-5 max-w-xl text-lg text-ink-soft">
        Bringing our community together through culture, festivals and events —
        find out what&apos;s happening next, browse memories from past
        gatherings, and support our work.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/events"
          className="rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-paper-raised hover:opacity-90"
        >
          Upcoming Events
        </Link>
        <Link
          href="/donate"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-paper-raised"
        >
          Donate
        </Link>
      </div>
    </div>
  );
}
