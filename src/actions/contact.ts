"use server";

import { supabase } from "@/lib/supabase";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "All fields are required." };
    }

    const { error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Supabase Error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, error: "Something went wrong." };
  }
}
