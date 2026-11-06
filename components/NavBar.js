
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions";
import { useAuth } from "@/components/AuthContext";

export default function NavBar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const roleLabel =
    user?.role === "admin"
      ? "Warden"
      : user?.role === "technician"
        ? "Technician"
        : "Student";

  const dashboardHref = user ? `/${user.role}` : "/login";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101c30] text-white shadow-[0_5px_25px_rgba(10,20,38,0.15)]">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-lg font-black shadow-lg shadow-blue-500/20">
            H
          </span>
          <span className="text-[23px] font-extrabold tracking-tight">
            Hostel<span className="text-blue-400">Care</span>
            <span className="text-teal-400">.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3 text-sm font-semibold sm:gap-7">
          {user ? (
            <>
              <Link
                href={dashboardHref}
                className={`hidden transition hover:text-teal-300 sm:inline ${
                  pathname === dashboardHref ? "text-teal-300" : "text-slate-300"
                }`}
              >
                Dashboard
              </Link>

              <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs text-slate-200 sm:inline-flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {roleLabel}
              </span>

              <form action={logoutAction}>
                <button className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <a
                href="/#features"
                className="hidden text-slate-300 transition hover:text-white sm:inline"
              >
                Features
              </a>
              <a
                href="/#how"
                className="hidden text-slate-300 transition hover:text-white sm:inline"
              >
                How it works
              </a>
              <Link
                href="/login"
                className="rounded-xl bg-white px-5 py-2.5 font-bold text-[#17243b] shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Login <span className="ml-1 text-blue-600">↗</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
