import { redirect } from "next/navigation";

// Keep one authentication screen for all three account types.
export default function RegisterRedirect() {
  redirect("/login?mode=register");
}
