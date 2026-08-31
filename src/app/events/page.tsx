import { createClient } from "@/lib/supabase/server";
import type { EventRecord } from "@/lib/types";
import { EventCard } from "@/components/event-card";

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("starts_at", { ascending: true })
    .returns<EventRecord[]>();

  return (
    <div className="bg-paper-raised">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold">Events</h1>

        {!events?.length && (
          <p className="mt-6 text-ink-soft">
            No events published yet. Check back soon, or follow us on{" "}
            <a
              href="https://www.instagram.com/scarborough_telugu_association/"
              target="_blank"
              rel="noreferrer"
              className="text-blue hover:underline"
            >
              Instagram
            </a>
            .
          </p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {events?.map((event) => {
            const imageUrl = event.image_path
              ? supabase.storage.from("event-images").getPublicUrl(event.image_path)
                  .data.publicUrl
              : null;

            return (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                startsAt={event.starts_at}
                venue={event.venue}
                imageUrl={imageUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
