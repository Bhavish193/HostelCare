"use client";
import Link from "next/link";
import { logoutAction } from "@/app/actions";
import { useAuth } from "@/components/AuthContext";

export default function NavBar() {
  const { user } = useAuth();
  const roleLabel = user?.role === "admin" ? "Warden" : user?.role === "technician" ? "Technician" : "Student";
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 shadow-[0_2px_16px_rgba(28,36,70,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link className="text-[25px] font-extrabold tracking-tight text-primary" href="/">HostelCare<span className="text-ink">.</span></Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-600 sm:gap-7">
          {user ? (
            <>
              <Link className="transition hover:text-primary" href={`/${user.role}`}>Dashboard</Link>
              <span className="hidden rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-primary sm:inline-flex">{roleLabel}</span>
              <form action={logoutAction}><button className="font-semibold text-primary transition hover:text-primary-dark">Logout</button></form>
            </>
          ) : (
            <>
              <a className="hidden transition hover:text-primary sm:inline" href="/#features">Features</a>
              <a className="hidden transition hover:text-primary sm:inline" href="/#how">How it works</a>
              <Link className="rounded-xl border border-primary/20 px-4 py-2.5 font-semibold text-primary transition hover:border-primary hover:bg-violet-50" href="/login">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
