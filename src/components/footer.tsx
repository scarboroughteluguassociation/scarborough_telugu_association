export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-raised">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Scarborough Telugu Association</p>
        <a
          href="https://www.instagram.com/scarborough_telugu_association/"
          target="_blank"
          rel="noreferrer"
          className="text-blue hover:underline"
        >
          @scarborough_telugu_association
        </a>
      </div>
    </footer>
  );
}
