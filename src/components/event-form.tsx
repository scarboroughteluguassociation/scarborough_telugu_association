"use client";

import type { EventRecord } from "@/lib/types";

function toLocalInputValue(iso: string) {
  const d = new Date(iso);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export function EventForm({
  event,
  action,
}: {
  event?: EventRecord;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="text-sm font-medium">
        Title
        <input
          type="text"
          name="title"
          required
          defaultValue={event?.title}
          className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>

      <label className="text-sm font-medium">
        Description
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={event?.description}
          className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="text-sm font-medium">
          Date &amp; time
          <input
            type="datetime-local"
            name="starts_at"
            required
            defaultValue={event ? toLocalInputValue(event.starts_at) : undefined}
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-teal"
          />
        </label>
        <label className="text-sm font-medium">
          Venue
          <input
            type="text"
            name="venue"
            required
            defaultValue={event?.venue}
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-teal"
          />
        </label>
      </div>

      <label className="text-sm font-medium">
        Event image {event && "(leave empty to keep current image)"}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="mt-1 w-full text-sm"
        />
      </label>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={event?.is_published ?? false}
          className="h-4 w-4"
        />
        Published (visible on the public site)
      </label>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-maroon px-5 py-2 text-sm font-semibold text-paper-raised hover:opacity-90"
      >
        {event ? "Save changes" : "Create event"}
      </button>
    </form>
  );
}
