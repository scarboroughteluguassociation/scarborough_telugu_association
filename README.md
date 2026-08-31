# Scarborough Telugu Association — Website

Next.js (App Router) + Supabase (database, auth, storage) + Stripe Payment Link for donations.

## Stack

- **Frontend + Admin**: Next.js, deployed on Vercel
- **Database + Auth**: Supabase (Postgres)
- **Image storage**: Supabase Storage
- **Donations**: Stripe Payment Link (no custom backend needed for v1)

## Local setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create a free project at [supabase.com](https://supabase.com), then in the SQL editor run [supabase/schema.sql](supabase/schema.sql).
3. In Supabase, go to **Authentication -> Users** and create the admin login(s) manually (email + password) — this is the account used to sign in at `/admin/login`.
4. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase **Project Settings -> API**
   - `NEXT_PUBLIC_DONATION_LINK` — see below
5. Run the dev server:
   ```
   npm run dev
   ```

## Setting up donations (Stripe Payment Link)

No custom payment code is needed for v1:

1. Create/sign in to the association's own Stripe account.
2. Go to **Payment links -> Create payment link**, set the donation amount (or "customer chooses amount"), and optionally enable recurring/monthly.
3. Stripe gives you a hosted URL — put it in `NEXT_PUBLIC_DONATION_LINK`.
4. On that same payment link's page in the Stripe Dashboard, download the **QR code** image and save it as `public/donate-qr.png` in this project.
5. All transactions and payouts appear in the Stripe Dashboard — no extra database needed.

## Admin panel

- `/admin/login` — sign in
- `/admin` — list, edit, delete events; publish/unpublish
- `/admin/events/new` — create an event (title, description, date/time, venue, image, publish toggle)

Only published events appear on the public `/events` page. Image uploads go to the `event-images` bucket in Supabase Storage.

## Deployment

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com), add the same environment variables from `.env.local`.
3. Point the GoDaddy domain's DNS at Vercel (Vercel's project settings show the exact records to add).

## Project agenda

See the full project agenda (scope, cost breakdown, ownership) shared separately as a document.
