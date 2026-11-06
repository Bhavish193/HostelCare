
"use client";

import { useCallback, useEffect, useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { technicianSchema } from "@/lib/validation";

const input =
  "min-w-0 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10";

const panel =
  "rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_8px_35px_rgba(31,41,80,0.06)] backdrop-blur-sm sm:p-7";

const button =
  "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [techs, setTechs] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assign, setAssign] = useState({});
  const [newTech, setNewTech] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [techError, setTechError] = useState("");

  const load = useCallback(async () => {
    try {
      const [u, c, t] = await Promise.all([
        fetch("/api/auth/me", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/complaints", { cache: "no-store" }).then(async (r) => ({
          ok: r.ok,
          data: await r.json(),
        })),
        fetch("/api/users", { cache: "no-store" }).then(async (r) => ({
          ok: r.ok,
          data: await r.json(),
        })),
      ]);

      if (!u.user) {
        window.location.href = "/login";
        return;
      }

      if (u.user.role !== "admin") {
        window.location.href = `/${u.user.role}`;
        return;
      }

      if (!c.ok) throw new Error(c.data.error || "Could not load complaints.");
      if (!t.ok) throw new Error(t.data.error || "Could not load technicians.");

      setItems(c.data.complaints || []);
      setTechs(t.data.users || []);
      setError("");
    } catch (e) {
      setError(e.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addTechnician(e) {
    e.preventDefault();
    setTechError("");
    setError("");
    setNotice("");

    const parsed = technicianSchema.safeParse(newTech);

    if (!parsed.success) {
      setTechError(
        parsed.error.issues[0]?.message || "Check the technician details."
      );
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not create technician.");
      }

      setNewTech({ name: "", email: "", password: "" });
      setNotice("Technician account created. They can now log in.");
      await load();
    } catch (e) {
      setTechError(e.message || "Unable to create technician account.");
    } finally {
      setSaving(false);
    }
  }

  async function assignTech(id) {
    const technicianId =
      assign[id] || items.find((item) => item.id === id)?.assignedTo?.id;

    if (!technicianId) {
      setError("Choose a technician first.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/complaints/${id}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technicianId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not assign technician.");
      }

      setNotice(
        "Technician assigned successfully. The job is now visible on their dashboard."
      );

      await load();
    } catch (e) {
      setError(e.message || "Unable to assign technician.");
    } finally {
      setSaving(false);
    }
  }

  const open = items.filter(
    (item) => !["Resolved", "Closed"].includes(item.status)
  ).length;

  const resolved = items.length - open;

  const stats = [
    {
      name: "Total complaints",
      value: items.length,
      icon: "▤",
      style: "from-violet-500/10 to-purple-500/5 text-violet-600",
    },
    {
      name: "Open complaints",
      value: open,
      icon: "◷",
      style: "from-amber-500/10 to-orange-500/5 text-amber-600",
    },
    {
      name: "Resolved",
      value: resolved,
      icon: "✓",
      style: "from-emerald-500/10 to-green-500/5 text-emerald-600",
    },
    {
      name: "Technicians",
      value: techs.length,
      icon: "⚒",
      style: "from-sky-500/10 to-blue-500/5 text-sky-600",
    },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-8 sm:py-12">

      {/* Dashboard heading */}
      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            WARDEN / ADMIN PORTAL
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Management dashboard
          </h1>

          <p className="mt-2 text-sm text-muted sm:text-base">
            Manage hostel maintenance, review complaints and coordinate your staff.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          onClick={load}
        >
          <span className="text-lg">↻</span>
          Refresh dashboard
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 to-white px-5 py-4 text-sm text-red-700 shadow-sm"
        >
          <span className="text-lg">!</span>
          {error}
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white px-5 py-4 text-sm text-emerald-700 shadow-sm"
        >
          <span className="text-lg">✓</span>
          {notice}
        </div>
      )}

      {/* Statistics */}
      <div className="mb-9 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="group relative overflow-hidden rounded-2xl border border-white bg-white p-5 shadow-[0_6px_25px_rgba(31,41,80,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(31,41,80,0.09)] sm:p-6"
          >
            <div
              className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${stat.style} opacity-70 blur-2xl transition-transform duration-500 group-hover:scale-150`}
            />

            <div className="relative flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-muted sm:text-sm">
                {stat.name}
              </span>

              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${stat.style} text-lg font-extrabold`}
              >
                {stat.icon}
              </span>
            </div>

            <strong className="relative mt-5 block text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {stat.value}
            </strong>
          </div>
        ))}
      </div>

      {/* Technician management */}
      <section className={`${panel} mb-7`}>
        <div className="mb-6 flex flex-col justify-between gap-3 border-b border-line pb-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-xl text-primary">
                ⚒
              </span>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-ink">
                  Technician management
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Create staff accounts and manage your maintenance team.
                </p>
              </div>
            </div>
          </div>

          <span className="w-fit rounded-full bg-primary/5 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-primary">
            STAFF MANAGEMENT
          </span>
        </div>

        <form
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1.2fr_auto]"
          onSubmit={addTechnician}
        >
          <input
            className={input}
            placeholder="Technician name"
            value={newTech.name}
            onChange={(e) =>
              setNewTech((s) => ({ ...s, name: e.target.value }))
            }
            required
          />

          <input
            className={input}
            type="email"
            placeholder="Email address"
            value={newTech.email}
            onChange={(e) =>
              setNewTech((s) => ({ ...s, email: e.target.value }))
            }
            required
          />

          <input
            className={input}
            type="password"
            placeholder="Temporary password (8+ characters)"
            minLength="8"
            value={newTech.password}
            onChange={(e) =>
              setNewTech((s) => ({ ...s, password: e.target.value }))
            }
            required
          />

          <button className={button} disabled={saving}>
            {saving ? "Please wait..." : "+ Add technician"}
          </button>
        </form>

        {techError && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {techError}
          </p>
        )}

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-sm text-muted">
            Registered technicians
            <span className="ml-2 font-bold text-ink">
              {techs.length}
            </span>
          </p>

          {techs.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {techs.map((tech) => (
                <span
                  key={tech.id}
                  className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">
              No technicians have been registered yet.
            </p>
          )}
        </div>
      </section>

      {/* Complaints */}
      <section className={panel}>
        <div className="mb-5 flex flex-col justify-between gap-3 border-b border-line pb-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-xl text-blue-600">
                ▤
              </span>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-ink">
                  All complaints
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Review requests and assign the right technician.
                </p>
              </div>
            </div>
          </div>

          <span className="w-fit rounded-full bg-primary/5 px-3 py-1.5 text-xs font-extrabold text-primary">
            {items.length} REQUESTS
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-14 text-sm text-muted">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            Loading complaints...
          </div>
        ) : items.length ? (
          <div className="space-y-3">
            {items.map((complaint) => (
              <div
                key={complaint.id}
                className="group rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Complaint details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold text-ink sm:text-lg">
                        {complaint.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-slate-700">
                        {complaint.student?.name || "Student"}
                      </span>
                      <span className="mx-2 text-slate-300">·</span>
                      {complaint.hostel}, Room {complaint.room}
                      <span className="mx-2 text-slate-300">·</span>
                      {complaint.category}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                          String(complaint.priority || "Medium").toLowerCase() === "high"
                            ? "bg-rose-50 text-rose-700"
                            : String(complaint.priority || "Medium").toLowerCase() === "low"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {complaint.priority || "Medium"} priority
                      </span>

                      <StatusBadge status={complaint.status} />
                    </div>

                    <p className="mt-3 text-xs text-muted">
                      Assigned to:{" "}
                      <span className="font-bold text-slate-700">
                        {complaint.assignedTo?.name || "Nobody yet"}
                      </span>
                    </p>
                  </div>

                  {/* Assignment controls */}
                  <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:min-w-[320px]">
                    <select
                      aria-label={`Select technician for ${complaint.title}`}
                      className={`${input} flex-1`}
                      value={
                        assign[complaint.id] ??
                        complaint.assignedTo?.id ??
                        ""
                      }
                      onChange={(e) =>
                        setAssign((s) => ({
                          ...s,
                          [complaint.id]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select technician</option>

                      {techs.map((tech) => (
                        <option value={tech.id} key={tech.id}>
                          {tech.name}
                        </option>
                      ))}
                    </select>

                    <button
                      className={`${button} shrink-0`}
                      disabled={saving || techs.length === 0}
                      onClick={() => assignTech(complaint.id)}
                    >
                      Assign →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-14 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-2xl text-primary">
              ✓
            </div>

            <h3 className="mt-4 font-bold text-ink">
              All clear for now!
            </h3>

            <p className="mt-1 text-sm text-muted">
              No complaints have been submitted yet.
            </p>
          </div>
        )}
      </section>

      <p className="mt-7 text-center text-xs text-muted">
        HostelCare · Making hostel maintenance simpler.
      </p>
    </div>
  );
}
