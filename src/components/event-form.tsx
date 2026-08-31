"use client";

import { useState } from "react";
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
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="text-sm font-medium">
        Title
        <input
          type="text"
          name="title"
          required
          defaultValue={event?.title}
          className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-blue"
        />
      </label>

      <label className="text-sm font-medium">
        Description
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={event?.description}
          className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-blue"
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
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-blue"
          />
        </label>
        <label className="text-sm font-medium">
          Venue
          <input
            type="text"
            name="venue"
            required
            defaultValue={event?.venue}
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-blue"
          />
        </label>
      </div>

      <div className="text-sm font-medium">
        Event image {event && "(leave empty to keep current image)"}
        <label className="mt-1 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-line bg-paper px-4 py-6 text-center hover:border-saffron">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-24 w-24 rounded-md object-cover" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span className="text-sm font-normal text-ink-soft">
            {fileName ?? "Click to upload an image"}
          </span>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setFileName(file?.name ?? null);
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
          />
        </label>
      </div>

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
        className="mt-2 w-fit rounded-full bg-saffron px-5 py-2 text-sm font-semibold text-paper-raised hover:opacity-90"
      >
        {event ? "Save changes" : "Create event"}
      </button>
    </form>
  );
}
