export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold">Contact</h1>
      <p className="mt-4 text-ink-soft">
        Questions about events, membership or volunteering? Reach out and
        we&apos;ll get back to you.
      </p>
      <div className="mt-8 space-y-1 text-sm">
        <p>
          <span className="text-ink-soft">Email:</span>{" "}
          info@scarboroughtelugu.org
        </p>
        <p>
          <span className="text-ink-soft">Instagram:</span>{" "}
          <a
            href="https://www.instagram.com/scarborough_telugu_association/"
            target="_blank"
            rel="noreferrer"
            className="text-blue hover:underline"
          >
            @scarborough_telugu_association
          </a>
        </p>
      </div>
    </div>
  );
}
