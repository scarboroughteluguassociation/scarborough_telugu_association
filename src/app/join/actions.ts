"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinAsMember(formData: FormData) {
  const fullName = (formData.get("full_name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const phone = (formData.get("phone") as string).trim();
  const message = (formData.get("message") as string).trim();

  if (fullName.length < 2 || fullName.length > 100) {
    redirect(`/join?error=${encodeURIComponent("Please enter your full name.")}`);
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    redirect(`/join?error=${encodeURIComponent("Please enter a valid email address.")}`);
  }
  if (phone.length > 30 || message.length > 2000) {
    redirect(`/join?error=${encodeURIComponent("One of the fields is too long.")}`);
  }

  const supabase = await createClient();

  const { error } = await supabase.from("members").insert({
    full_name: fullName,
    email,
    phone: phone || null,
    message: message || null,
  });

  if (error) {
    redirect(`/join?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/join?success=1");
}
