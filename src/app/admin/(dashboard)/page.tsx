import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { EventRecord } from "@/lib/types";
import { deleteEvent } from "@/app/admin/actions";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false })
    .returns<EventRecord[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Events</h1>
        <Link
          href="/admin/events/new"
          className="rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-paper-raised hover:opacity-90"
        >
          + New event
        </Link>
      </div>

      <div className="mt-6 divide-y divide-line rounded-lg border border-line bg-paper-raised">
        {events?.length ? (
          events.map((event) => {
            const imageUrl = event.image_path
              ? supabase.storage.from("event-images").getPublicUrl(event.image_path)
                  .data.publicUrl
              : null;

            return (
              <div key={event.id} className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-paper">
                    {imageUrl && (
                      <Image src={imageUrl} alt="" fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-ink-soft">
                      {new Date(event.starts_at).toLocaleString("en-CA")} ·{" "}
                      {event.is_published ? (
                        <span className="text-green">Published</span>
                      ) : (
                        <span className="text-gold">Draft</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Link href={`/admin/events/${event.id}/edit`} className="text-blue hover:underline">
                    Edit
                  </Link>
                  <form action={deleteEvent.bind(null, event.id)}>
                    <button type="submit" className="text-saffron hover:underline">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        ) : (
          <p className="p-6 text-sm text-ink-soft">No events yet. Create your first one.</p>
        )}
      </div>
    </div>
  );
}
