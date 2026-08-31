export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold">Gallery</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Photos from past events. This section can pull images from published
        events automatically, or be managed as its own admin section later.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg border border-line bg-paper-raised"
          />
        ))}
      </div>
    </div>
  );
}
