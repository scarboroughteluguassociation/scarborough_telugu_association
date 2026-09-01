import fs from "fs";
import path from "path";
import Image from "next/image";

const ETRANSFER_EMAIL = process.env.NEXT_PUBLIC_ETRANSFER_EMAIL;
const DONATION_LINK = process.env.NEXT_PUBLIC_DONATION_LINK;

export default function DonatePage() {
  // Drop the association's Interac QR (e.g. from their bank's "Business
  // Request Money" feature) at public/donate-qr.png and this section
  // appears automatically — no code change needed.
  const hasQr = fs.existsSync(path.join(process.cwd(), "public", "donate-qr.png"));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold">Support Our Community</h1>
      <p className="mx-auto mt-4 max-w-lg text-ink-soft">
        Your donation helps us host festivals, cultural programs and
        community events throughout the year.
        {/* {hasQr ? " — scan the code below, or send directly to the email shown." : " to the email below."} */}
      </p>

      {hasQr && (
        <div className="mx-auto mt-10 w-fit rounded-xl border border-line bg-paper-raised p-8">
          <Image
            src="/donate-qr.png"
            alt="Scan to send an Interac e-Transfer"
            width={220}
            height={220}
            className="mx-auto"
          />
          <p className="mt-3 font-mono text-xs text-ink-soft">
            Scan with your banking app
          </p>
        </div>
      )}

      <div className="mt-8">
        {ETRANSFER_EMAIL ? (
          <>
            <p className="text-sm text-ink-soft">
              For donations, please interac to this email:
            </p>
            <p className="mt-1 text-sm">
            
              <span className="font-semibold text-saffron">{ETRANSFER_EMAIL}</span>
            </p>
          </>
        ) : (
          <p className="text-sm text-gold">
            Set NEXT_PUBLIC_ETRANSFER_EMAIL to the association&apos;s
            e-Transfer email to show it here.
          </p>
        )}
      </div>

      {DONATION_LINK && (
        <div className="mt-6">
          <a
            href={DONATION_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-paper-raised hover:opacity-90"
          >
            Donate by Card
          </a>
        </div>
      )}

      <p className="mx-auto mt-8 max-w-md text-xs text-ink-soft">
        Interac e-Transfer donations go directly to the association&apos;s
        bank account with no card-processing fees.
        {DONATION_LINK &&
          " Card donations are also accepted and processed securely by Stripe."}
      </p>
    </div>
  );
}
