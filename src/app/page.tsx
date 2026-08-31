import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { EventRecord } from "@/lib/types";
import { HeroCarousel } from "@/components/hero-carousel";
import { EventCard } from "@/components/event-card";

export default async function Home() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("starts_at", { ascending: true })
    .limit(3)
    .returns<EventRecord[]>();

  return (
    <div>
      <section className="relative overflow-hidden bg-saffron-soft">
        <Image
          src="/assets/temple-bg-removebg-preview.png"
          alt=""
          width={1152}
          height={2048}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-full w-24 select-none object-cover object-top-left sm:w-32 md:w-40 lg:w-48"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-11.75 sm:px-10 sm:py-13.75">
          <HeroCarousel />
        </div>
      </section>

      {!!events?.length && (
        <section className="bg-paper-raised">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold">Events</h2>
              <Link
                href="/events"
                className="text-sm font-semibold text-blue hover:underline"
              >
                See all &rarr;
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
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
        </section>
      )}
    </div>
  );
}
