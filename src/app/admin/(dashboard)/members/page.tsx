import { createClient } from "@/lib/supabase/server";
import type { MemberRecord } from "@/lib/types";
import { deleteMember } from "@/app/admin/actions";

export default async function AdminMembersPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<MemberRecord[]>();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Members</h1>

      <div className="mt-6 divide-y divide-line rounded-lg border border-line bg-paper-raised">
        {members?.length ? (
          members.map((member) => (
            <div key={member.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium">{member.full_name}</p>
                <p className="text-xs text-ink-soft">
                  {member.email}
                  {member.phone ? ` · ${member.phone}` : ""} ·{" "}
                  {new Date(member.created_at).toLocaleString("en-CA")}
                </p>
                {member.message && (
                  <p className="mt-1 text-sm text-ink-soft">{member.message}</p>
                )}
              </div>
              <form action={deleteMember.bind(null, member.id)}>
                <button type="submit" className="text-sm text-saffron hover:underline">
                  Delete
                </button>
              </form>
            </div>
          ))
        ) : (
          <p className="p-6 text-sm text-ink-soft">No membership requests yet.</p>
        )}
      </div>
    </div>
  );
}
