import { InstagramIcon } from "@/components/instagram-icon";

export function Footer() {
  return (
    <footer className="mt-auto bg-[#610917]">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-paper-raised sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Scarborough Telugu Association</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="mailto:scarboroughteluguassociation@gmail.com"
            className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-paper-raised hover:text-[#610917]"
          >
            scarboroughteluguassociation@gmail.com
          </a>
          <a
            href="https://www.instagram.com/scarborough_telugu_association/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors hover:bg-paper-raised hover:text-[#610917]"
          >
            <InstagramIcon className="h-4 w-4" />
            @scarborough_telugu_association
          </a>
        </div>
      </div>
      <div className="border-t border-paper-raised/10 px-6 py-3 text-center text-xs text-paper-raised/60 sm:text-right">
        Website designed and developed by{" "}
        <a
          href="https://www.instagram.com/theakstudio.in/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-paper-raised hover:underline"
        >
          AK Studio
        </a>
      </div>
    </footer>
  );
}
