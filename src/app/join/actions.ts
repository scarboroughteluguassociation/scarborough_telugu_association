"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function joinAsMember(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("members").insert({
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || null,
    message: (formData.get("message") as string) || null,
  });

  if (error) {
    redirect(`/join?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/join?success=1");
}
