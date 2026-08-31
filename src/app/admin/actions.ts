"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function uploadEventImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File) {
  if (!file || file.size === 0) return null;

  const path = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("event-images").upload(path, file);
  if (error) throw new Error(error.message);
  return path;
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const imageFile = formData.get("image") as File;
  const imagePath = await uploadEventImage(supabase, imageFile);

  const { error } = await supabase.from("events").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    starts_at: formData.get("starts_at") as string,
    venue: formData.get("venue") as string,
    image_path: imagePath,
    is_published: formData.get("is_published") === "on",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/events");
  redirect("/admin");
}

export async function updateEvent(eventId: string, formData: FormData) {
  const supabase = await createClient();

  const imageFile = formData.get("image") as File;
  const imagePath = await uploadEventImage(supabase, imageFile);

  const update: Record<string, unknown> = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    starts_at: formData.get("starts_at") as string,
    venue: formData.get("venue") as string,
    is_published: formData.get("is_published") === "on",
  };

  if (imagePath) {
    const { data: existing } = await supabase
      .from("events")
      .select("image_path")
      .eq("id", eventId)
      .single();

    update.image_path = imagePath;

    if (existing?.image_path) {
      await supabase.storage.from("event-images").remove([existing.image_path]);
    }
  }

  const { error } = await supabase.from("events").update(update).eq("id", eventId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/events");
  redirect("/admin");
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("events")
    .select("image_path")
    .eq("id", eventId)
    .single();

  const { error } = await supabase.from("events").delete().eq("id", eventId);
  if (error) throw new Error(error.message);

  if (existing?.image_path) {
    await supabase.storage.from("event-images").remove([existing.image_path]);
  }

  revalidatePath("/admin");
  revalidatePath("/events");
}
