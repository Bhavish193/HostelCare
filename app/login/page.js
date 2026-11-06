
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loginSchema, registrationSchema } from "@/lib/validation";

const field =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

const label = "flex flex-col gap-2 text-sm font-bold text-slate-700";
const errorClass = "text-xs font-medium text-red-600";

const roleNames = {
  student: "Student",
  technician: "Technician",
  admin: "Admin / Warden",
};

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    hostel: "",
    room: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "register") {
      setMode("register");
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setError("");
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setErrors({});
    setError("");
  }

  function handleRoleChange(e) {
    setRole(e.target.value);
    setErrors({});
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setErrors({});

    const payload =
      mode === "login"
        ? { email: form.email, password: form.password, role }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            role,
            ...(role === "student"
              ? { hostel: form.hostel, room: form.room }
              : {}),
          };

    const validation =
      mode === "login"
        ? loginSchema.safeParse(payload)
        : registrationSchema.safeParse(payload);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([key, messages]) => [
            key,
            messages?.[0] || "",
          ])
        )
      );
      setError("Please correct the highlighted fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        mode === "login" ? "/api/auth/login" : "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validation.data),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");

        if (data.fields) {
          setErrors(
            Object.fromEntries(
              Object.entries(data.fields).map(([key, messages]) => [
                key,
                messages?.[0] || "",
              ])
            )
          );
        }
        return;
      }

      window.location.href = `/${data.user.role}`;
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const isStudentRegistration = mode === "register" && role === "student";

  return (
    <div className="relative flex min-h-[calc(100vh-150px)] items-center justify-center overflow-hidden bg-[#edf2f7] px-4 py-10 sm:px-8">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_30px_100px_rgba(16,28,48,0.14)] lg:grid-cols-[0.9fr_1.1fr]">
        {/* Branding panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#101c30] p-10 text-white lg:flex xl:p-12">
          <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />

          <div className="relative">
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              Hostel<span className="text-blue-400">Care</span>.
            </Link>

            <div className="mt-24">
              <span className="inline-flex rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-[10px] font-extrabold tracking-[0.2em] text-teal-300">
                CAMPUS LIVING, IMPROVED
              </span>

              <h2 className="mt-7 text-4xl font-extrabold leading-[1.13] tracking-tight xl:text-5xl">
                A better hostel starts with{" "}
                <span className="hc-gradient-text">better care.</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">
                One connected place to report issues, manage repairs and keep
                everyone informed.
              </p>
            </div>
          </div>

          <div className="relative mt-16 space-y-4">
            {[
              ["01", "Report issues without the hassle"],
              ["02", "Know who is handling your request"],
              ["03", "Track repairs until resolution"],
            ].map(([number, text]) => (
              <div key={number} className="flex items-center gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-xs font-extrabold text-teal-300">
                  {number}
                </span>
                <span className="text-sm text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Form panel */}
        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="text-lg font-extrabold tracking-tight text-[#17243b] lg:hidden">
              Hostel<span className="text-blue-600">Care</span>.
            </Link>
            <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-emerald-700">
              SECURE ACCESS
            </span>
          </div>

          <div className="mb-7">
            <span className="text-xs font-extrabold tracking-[0.18em] text-blue-600">
              {mode === "login" ? "WELCOME BACK" : "JOIN HOSTELCARE"}
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#17243b] sm:text-4xl">
              {mode === "login" ? "Sign in to your account" : "Create your account"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {mode === "login"
                ? "Enter your details to access your HostelCare workspace."
                : "Choose your role and get started with HostelCare."}
            </p>
          </div>

          <div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-lg py-3 text-sm font-bold transition ${
                mode === "login"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`rounded-lg py-3 text-sm font-bold transition ${
                mode === "register"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Register
            </button>
          </div>

          <form noValidate onSubmit={handleSubmit} className="space-y-5">
            <label className={label}>
              Account type
              <select className={field} value={role} onChange={handleRoleChange}>
                <option value="student">Student</option>
                <option value="technician">Technician</option>
                <option value="admin">Admin / Warden</option>
              </select>
              {errors.role && <span className={errorClass}>{errors.role}</span>}
            </label>

            {mode === "register" && (
              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <p className="text-sm font-bold text-blue-900">
                  {roleNames[role]} registration
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-800/80">
                  {role === "student"
                    ? "Create an account to report and track hostel maintenance issues."
                    : role === "technician"
                      ? "Create an account to receive and manage assigned repair jobs."
                      : "Create an account to manage complaints and staff."}
                </p>
              </div>
            )}

            {mode === "register" && (
              <label className={label}>
                Full name
                <input
                  className={field}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.name && <span className={errorClass}>{errors.name}</span>}
              </label>
            )}

            <label className={label}>
              Email address
              <input
                className={field}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <span className={errorClass}>{errors.email}</span>}
            </label>

            <label className={label}>
              Password
              <input
                className={field}
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
              {mode === "register" && (
                <small className="font-normal text-slate-500">
                  8+ characters, including a letter, number and special character.
                </small>
              )}
              {errors.password && <span className={errorClass}>{errors.password}</span>}
            </label>

            {isStudentRegistration && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={label}>
                  Hostel
                  <input
                    className={field}
                    name="hostel"
                    value={form.hostel}
                    onChange={handleChange}
                    placeholder="Hostel name"
                  />
                  {errors.hostel && <span className={errorClass}>{errors.hostel}</span>}
                </label>

                <label className={label}>
                  Room number
                  <input
                    className={field}
                    name="room"
                    value={form.room}
                    onChange={handleChange}
                    placeholder="Room number"
                  />
                  {errors.room && <span className={errorClass}>{errors.room}</span>}
                </label>
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in to HostelCare →"
                  : `Create ${roleNames[role]} account →`}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            {mode === "login" ? "New to HostelCare? " : "Already have an account? "}
            <button
              type="button"
              className="font-extrabold text-blue-600 hover:text-teal-600"
              onClick={() => switchMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}
