"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Logout the currently authenticated user
export async function logoutAction() {
  const cookieStore = await cookies();

  // Remove authentication token
  cookieStore.delete("hostelcare_token");

  // Redirect to homepage
  redirect("/");
}
