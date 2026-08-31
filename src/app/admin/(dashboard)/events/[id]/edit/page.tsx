import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { EventRecord } from "@/lib/types";
import { EventForm } from "@/components/event-form";
import { updateEvent } from "@/app/admin/actions";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single<EventRecord>();

  if (!event) notFound();

  const action = updateEvent.bind(null, id);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold">Edit Event</h1>
      <div className="mt-6">
        <EventForm event={event} action={action} />
      </div>
    </div>
  );
}
