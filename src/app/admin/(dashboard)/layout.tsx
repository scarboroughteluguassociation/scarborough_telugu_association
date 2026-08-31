import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
        <Link href="/admin" className="font-display text-lg font-semibold">
          Event Admin
        </Link>
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
