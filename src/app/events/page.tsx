import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { EventRecord } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("starts_at", { ascending: true })
    .returns<EventRecord[]>();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold">Upcoming Events</h1>

      {!events?.length && (
        <p className="mt-6 text-ink-soft">
          No events published yet. Check back soon, or follow us on{" "}
          <a
            href="https://www.instagram.com/scarborough_telugu_association/"
            target="_blank"
            rel="noreferrer"
            className="text-teal hover:underline"
          >
            Instagram
          </a>
          .
        </p>
      )}

      <div className="mt-8 space-y-4">
        {events?.map((event) => {
          const imageUrl = event.image_path
            ? supabase.storage.from("event-images").getPublicUrl(event.image_path)
                .data.publicUrl
            : null;

          return (
            <article
              key={event.id}
              className="overflow-hidden rounded-lg border border-line bg-paper-raised sm:flex"
            >
              {imageUrl && (
                <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-56">
                  <Image
                    src={imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="font-mono text-xs tracking-wide text-teal uppercase">
                  {formatDate(event.starts_at)}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold">
                  {event.title}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">{event.venue}</p>
                <p className="mt-3 text-sm">{event.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
