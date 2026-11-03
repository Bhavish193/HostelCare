"use client";

import { useEffect, useState } from "react";
import { loginSchema, registrationSchema } from "@/lib/validation";

const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";
const label = "flex flex-col gap-2 text-sm font-semibold text-slate-700";
const errorClass = "mt-1 text-xs font-medium text-red-600";

const roleNames = {
  student: "Student",
  technician: "Technician",
  admin: "Admin / Warden",
};

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name: "", email: "", password: "", hostel: "", room: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "register") setMode("register");
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

    const payload = mode === "login"
      ? { email: form.email, password: form.password, role }
      : {
          name: form.name,
          email: form.email,
          password: form.password,
          role,
          ...(role === "student" ? { hostel: form.hostel, room: form.room } : {}),
        };

    const validation = mode === "login"
      ? loginSchema.safeParse(payload)
      : registrationSchema.safeParse(payload);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(
        Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0] || ""])
      ));
      setError("Please correct the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        if (data.fields) {
          setErrors(Object.fromEntries(
            Object.entries(data.fields).map(([key, messages]) => [key, messages?.[0] || ""])
          ));
        }
        return;
      }

      // The server returns the saved database role; always use that for routing.
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
    <div className="relative flex min-h-[calc(100vh-145px)] items-center justify-center overflow-hidden bg-gradient-to-br from-violet-100 via-slate-50 to-blue-100 px-4 py-12">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />

      <form noValidate className="relative w-full max-w-lg rounded-3xl border border-white/80 bg-white/95 p-7 shadow-[0_24px_80px_rgba(43,48,95,0.13)] backdrop-blur-xl sm:p-10" onSubmit={handleSubmit}>
        <div className="mb-6">
          <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.2em] text-primary">
            {mode === "login" ? "WELCOME BACK" : "GET STARTED"}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
            {mode === "login" ? "Login to HostelCare" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            {mode === "login" ? "Access your maintenance dashboard." : "Choose your account type and join HostelCare."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
          <button type="button" onClick={() => switchMode("login")} className={`rounded-lg py-2.5 text-sm font-bold transition ${mode === "login" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-ink"}`}>Login</button>
          <button type="button" onClick={() => switchMode("register")} className={`rounded-lg py-2.5 text-sm font-bold transition ${mode === "register" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-ink"}`}>Register</button>
        </div>

        <div className="space-y-4">
          <label className={label}>Account type
            <select className={field} value={role} onChange={handleRoleChange}>
              <option value="student">Student</option>
              <option value="technician">Technician</option>
              <option value="admin">Admin / Warden</option>
            </select>
            {errors.role && <span className={errorClass}>{errors.role}</span>}
          </label>

          {mode === "register" && (
            <div className="rounded-xl border border-violet-100 bg-violet-50/70 px-4 py-3 text-sm text-violet-800">
              <strong>{roleNames[role]} registration</strong>
              <p className="mt-1 text-xs leading-5 text-violet-700">
                {role === "student"
                  ? "Create a student account to report and track hostel maintenance issues."
                  : role === "technician"
                    ? "Create a technician account to receive and manage assigned repair jobs."
                    : "Create an admin / warden account to manage complaints and staff."}
              </p>
            </div>
          )}

          {mode === "register" && <label className={label}>Full name
            <input className={field} name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" autoComplete="name" />
            {errors.name && <span className={errorClass}>{errors.name}</span>}
          </label>}

          <label className={label}>Email address
            <input className={field} name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" autoComplete="email" />
            {errors.email && <span className={errorClass}>{errors.email}</span>}
          </label>

          <label className={label}>Password
            <input className={field} name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" autoComplete={mode === "login" ? "current-password" : "new-password"} />
            {mode === "register" && <small className="font-normal text-muted">8+ characters, including a letter, number and special character.</small>}
            {errors.password && <span className={errorClass}>{errors.password}</span>}
          </label>

          {isStudentRegistration && <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>Hostel
              <input className={field} name="hostel" value={form.hostel} onChange={handleChange} placeholder="Hostel name" />
              {errors.hostel && <span className={errorClass}>{errors.hostel}</span>}
            </label>
            <label className={label}>Room number
              <input className={field} name="room" value={form.room} onChange={handleChange} placeholder="Room number" />
              {errors.room && <span className={errorClass}>{errors.room}</span>}
            </label>
          </div>}
        </div>

        {error && <p role="alert" className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button type="submit" className="mt-7 w-full rounded-xl bg-gradient-to-r from-primary to-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : `Create ${roleNames[role]} account`}
        </button>

        <p className="mt-6 text-center text-sm text-muted">
          {mode === "login" ? "Don't have an account? " : "Already registered? "}
          <button type="button" className="font-bold text-primary hover:text-primary-dark" onClick={() => switchMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
