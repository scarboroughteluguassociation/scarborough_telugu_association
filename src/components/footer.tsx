export function Footer() {
  return (
    <footer className="mt-auto bg-[#610917]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-paper-raised/85 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Scarborough Telugu Association</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="mailto:scarboroughteluguassociation@gmail.com"
            className="hover:text-paper-raised hover:underline"
          >
            scarboroughteluguassociation@gmail.com
          </a>
          <a
            href="https://www.instagram.com/scarborough_telugu_association/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-paper-raised hover:underline"
          >
            @scarborough_telugu_association
          </a>
        </div>
      </div>
    </footer>
  );
}
