import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-display text-lg font-semibold">
            Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/admin" className="text-ink-soft hover:text-ink">
              Events
            </Link>
            <Link href="/admin/members" className="text-ink-soft hover:text-ink">
              Members
            </Link>
          </nav>
        </div>
        <form action={logout}>
          <button type="submit" className="text-sm text-ink-soft hover:text-ink">
            Sign out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
