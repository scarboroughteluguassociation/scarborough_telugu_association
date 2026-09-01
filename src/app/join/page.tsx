import { joinAsMember } from "@/app/join/actions";

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-3xl font-semibold">Join as a Member</h1>
      <p className="mt-4 text-ink-soft">
        Become a member of the Scarborough Telugu Association to stay
        connected with our events, festivals and community programs.
      </p>

      {success && (
        <p className="mt-6 rounded-md bg-paper-raised px-3 py-2 text-sm text-green">
          Thank you for joining! We&apos;ll be in touch soon.
        </p>
      )}
      {error && (
        <p className="mt-6 rounded-md bg-saffron-soft px-3 py-2 text-sm text-saffron">
          {error}
        </p>
      )}

      <form action={joinAsMember} className="mt-8 flex flex-col gap-4">
        <label className="text-sm font-medium">
          Full name
          <input
            type="text"
            name="full_name"
            required
            minLength={2}
            maxLength={100}
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-blue"
          />
        </label>
        <label className="text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-blue"
          />
        </label>
        <label className="text-sm font-medium">
          Phone (optional)
          <input
            type="tel"
            name="phone"
            maxLength={30}
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-blue"
          />
        </label>
        <label className="text-sm font-medium">
          Anything you&apos;d like us to know? (optional)
          <textarea
            name="message"
            rows={3}
            maxLength={2000}
            className="mt-1 w-full rounded-md border border-line bg-paper-raised px-3 py-2 text-sm outline-none focus:border-blue"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-fit rounded-full bg-[#610917] px-5 py-2 text-sm font-semibold text-paper-raised hover:opacity-90"
        >
          Join
        </button>
      </form>
    </div>
  );
}
