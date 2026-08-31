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
          width={241}
          height={1033}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-16 select-none sm:w-20 md:w-24 lg:w-28"
        />
        <Image
          src="/assets/lotus1-cutout.png"
          alt=""
          width={467}
          height={1915}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-auto w-16 select-none sm:w-20 md:w-24 lg:w-28"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-11.75 sm:px-10 sm:py-13.75">
          <HeroCarousel />
        </div>
      </section>

      {!!events?.length && (
        <section className="bg-paper-raised">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="relative text-center">
              <h2 className="font-display text-3xl font-semibold">Events</h2>
              <Link
                href="/events"
                className="text-sm font-semibold text-blue hover:underline sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
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
