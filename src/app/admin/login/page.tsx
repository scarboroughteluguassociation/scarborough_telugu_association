import { login } from "@/app/admin/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex max-w-sm flex-col px-6 py-24">
      <h1 className="font-display text-2xl font-semibold">Admin Login</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Sign in to manage events for the Scarborough Telugu Association.
      </p>

      {error && (
        <p className="mt-4 rounded-md bg-maroon-soft px-3 py-2 text-sm text-maroon">
          {error}
        </p>
      )}

      <form action={login} className="mt-6 flex flex-col gap-4">
        <label className="text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-teal"
          />
        </label>
        <label className="text-sm font-medium">
          Password
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-teal"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-paper-raised hover:opacity-90"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
