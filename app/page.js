
import Link from "next/link";

const features = [
  {
    number: "01",
    icon: "⌂",
    title: "For Students",
    description:
      "Report hostel problems, upload photos and follow every update without having to chase anyone.",
    points: ["Submit complaints", "Track repair progress", "Review resolutions"],
    color: "violet",
  },
  {
    number: "02",
    icon: "🔧",
    title: "For Technicians",
    description:
      "Stay on top of assigned jobs, schedule repairs and keep students informed throughout the process.",
    points: ["Manage assigned jobs", "Schedule repairs", "Upload completion proof"],
    color: "cyan",
  },
  {
    number: "03",
    icon: "▦",
    title: "For Wardens",
    description:
      "Get a clear overview of hostel maintenance, prioritise issues and make sure every job gets handled.",
    points: ["Monitor complaints", "Assign technicians", "Track hostel repairs"],
    color: "orange",
  },
];

const steps = [
  {
    number: "01",
    icon: "↗",
    title: "Report",
    description: "A student submits a maintenance complaint with the relevant details.",
  },
  {
    number: "02",
    icon: "◎",
    title: "Assign",
    description: "The warden reviews the issue and assigns the right technician.",
  },
  {
    number: "03",
    icon: "⚒",
    title: "Repair",
    description: "The technician schedules the work and updates its progress.",
  },
  {
    number: "04",
    icon: "✓",
    title: "Resolve",
    description: "The repair is completed and the complaint moves towards closure.",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#f8f9fd] text-[#171b38]">

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#111a32]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-violet-600/30 blur-[130px]" />
          <div className="absolute -right-40 top-10 h-[600px] w-[600px] rounded-full bg-blue-500/25 blur-[140px]" />
          <div className="absolute bottom-[-250px] left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:55px_55px]" />
        </div>

        <div className="relative mx-auto grid min-h-[690px] max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">

          {/* Hero text */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-violet-200">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
              HOSTEL MAINTENANCE, REIMAGINED
            </span>

            <h1 className="mt-8 max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
              Your hostel.
              <br />
              Your comfort.
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Our responsibility.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              A better way to handle hostel maintenance. Report issues, follow
              repairs and keep everyone accountable—all in one place.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-indigo-500/30"
              >
                Get Started
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>

              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                Explore how it works
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-slate-400">
              <span>✓ Simple reporting</span>
              <span>✓ Transparent updates</span>
              <span>✓ Accountable repairs</span>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-violet-500/30 to-cyan-400/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400">
                    HOSTELCARE
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Maintenance overview
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold text-emerald-300">
                  SYSTEM ACTIVE
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    Pending
                  </div>
                  <p className="mt-4 text-4xl font-extrabold text-white">01</p>
                  <p className="mt-1 text-[11px] text-slate-400">Awaiting assignment</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    In progress
                  </div>
                  <p className="mt-4 text-4xl font-extrabold text-white">02</p>
                  <p className="mt-1 text-[11px] text-slate-400">Being worked on</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-slate-400">
                      RECENT COMPLAINT
                    </p>
                    <h3 className="mt-2 font-bold text-white">
                      Water leakage
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Block B · Room 204
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold text-emerald-300">
                    Resolved
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                  </div>
                  <span className="text-xs font-bold text-cyan-300">100%</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500/20 to-cyan-500/10 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-lg text-cyan-200">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Issue successfully resolved</p>
                  <p className="mt-1 text-xs text-slate-400">
                    From report to resolution.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-white/15 bg-[#202b49] px-5 py-4 shadow-xl sm:block">
              <p className="text-xs font-bold text-white">One connected platform.</p>
              <p className="mt-1 text-[10px] text-slate-400">
                Three roles. One goal.
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
      </section>

      {/* FEATURES */}
      <section id="features" className="relative bg-[#f8f9fd] px-5 py-24 sm:px-8 lg:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-200/30 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-[11px] font-extrabold tracking-[0.22em] text-violet-600">
                ONE PLATFORM, EVERYONE CONNECTED
              </span>
              <h2 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-[#171b38] sm:text-5xl">
                Maintenance that works
                <span className="block bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  for everyone.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-500">
              Every person has a role to play. HostelCare brings students,
              technicians and wardens together to make hostel maintenance
              simpler and more transparent.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-[0_15px_50px_rgba(28,35,75,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_65px_rgba(55,48,120,0.12)] sm:p-8"
              >
                <div
                  className={`absolute right-0 top-0 h-36 w-36 rounded-full blur-[65px] ${
                    feature.color === "violet"
                      ? "bg-violet-300/50"
                      : feature.color === "cyan"
                        ? "bg-cyan-300/50"
                        : "bg-orange-300/50"
                  }`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-widest text-slate-300">
                      {feature.number}
                    </span>
                    <div
                      className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl text-white shadow-lg ${
                        feature.color === "violet"
                          ? "bg-gradient-to-br from-violet-500 to-indigo-600 shadow-violet-500/20"
                          : feature.color === "cyan"
                            ? "bg-gradient-to-br from-cyan-400 to-blue-600 shadow-cyan-500/20"
                            : "bg-gradient-to-br from-orange-400 to-rose-500 shadow-orange-500/20"
                      }`}
                    >
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="mt-8 text-2xl font-extrabold text-[#171b38]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 min-h-[76px] text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="my-6 h-px bg-slate-100" />

                  <ul className="space-y-3">
                    {feature.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 text-sm font-medium text-slate-600"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-violet-50 text-[10px] font-bold text-violet-600">
                          ✓
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-8 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-24 ${
                      feature.color === "violet"
                        ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                        : feature.color === "cyan"
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                          : "bg-gradient-to-r from-orange-400 to-rose-500"
                    }`}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="relative overflow-hidden bg-[#edf0ff] px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-300/25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-300/30 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-[11px] font-extrabold tracking-[0.22em] text-violet-600">
              SIMPLE. TRANSPARENT. ACCOUNTABLE.
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#171b38] sm:text-5xl">
              From complaint
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                {" "}to completion.
              </span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              A clear process ensures that no maintenance request gets lost
              along the way.
            </p>
          </div>

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-12 hidden h-px border-t-2 border-dashed border-violet-300 lg:block" />

            {steps.map((step) => (
              <article
                key={step.number}
                className="relative rounded-[1.75rem] border border-white/90 bg-white/80 p-7 shadow-[0_15px_45px_rgba(55,65,120,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold tracking-tight text-violet-200">
                    {step.number}
                  </span>
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-100 to-blue-100 text-xl font-bold text-violet-700 shadow-sm">
                    {step.icon}
                  </div>
                </div>

                <h3 className="mt-8 text-xl font-extrabold text-[#171b38]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#f8f9fd] px-5 py-24 sm:px-8 lg:py-32">
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-300/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#111a32] px-7 py-12 shadow-[0_30px_90px_rgba(25,32,70,0.22)] sm:px-12 sm:py-16 lg:px-16">
            <div className="pointer-events-none absolute -right-24 -top-40 h-[480px] w-[480px] rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-10 -top-24 h-[350px] w-[350px] rounded-full border border-white/10" />
            <div className="pointer-events-none absolute right-20 top-20 h-72 w-72 rounded-full bg-violet-600/30 blur-[100px]" />

            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* CTA text - unchanged */}
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-violet-200">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  START WITH HOSTELCARE
                </span>

                <h2 className="mt-7 text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Better living
                  <br />
                  starts with
                  <br />
                  <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                    better maintenance.
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
                  From the first complaint to the final repair, keep every
                  maintenance request organised, visible and accountable.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/register"
                    className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Create your account
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>

                  <Link
                    href="/login"
                    className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    Sign in
                  </Link>
                </div>

                <p className="mt-6 text-xs font-medium text-slate-400">
                  Built for students, technicians and hostel management.
                </p>
              </div>

              {/* REDESIGNED: Maintenance journey instead of another dashboard */}
              <div className="relative mx-auto w-full max-w-md lg:pl-4">
                <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-cyan-400/20 blur-3xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#182541] p-6 shadow-2xl sm:p-8">
                  <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-extrabold tracking-[0.22em] text-cyan-300">
                          THE HOSTELCARE JOURNEY
                        </p>
                        <h3 className="mt-3 text-2xl font-extrabold text-white">
                          One report.
                          <br />
                          A clear resolution.
                        </h3>
                      </div>

                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-xl text-cyan-200">
                        ↗
                      </div>
                    </div>

                    <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
                      Every maintenance issue follows a visible path, with
                      responsibility at every step.
                    </p>

                    <div className="mt-8 space-y-0">
                      {/* Step 1 */}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-500 text-sm font-extrabold text-white shadow-lg shadow-violet-500/20">
                            01
                          </div>
                          <div className="my-2 h-12 w-px bg-gradient-to-b from-violet-400 to-blue-400" />
                        </div>

                        <div className="flex-1 pb-6">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-bold text-white">Issue reported</h4>
                            <span className="rounded-full bg-violet-400/10 px-2.5 py-1 text-[9px] font-bold tracking-wide text-violet-300">
                              STUDENT
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            A student reports a leaking tap in Room 204.
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-500 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20">
                            02
                          </div>
                          <div className="my-2 h-12 w-px bg-gradient-to-b from-blue-400 to-cyan-400" />
                        </div>

                        <div className="flex-1 pb-6">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-bold text-white">Technician assigned</h4>
                            <span className="rounded-full bg-blue-400/10 px-2.5 py-1 text-[9px] font-bold tracking-wide text-blue-300">
                              WARDEN
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            The complaint is reviewed and sent to the right person.
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-500 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/20">
                            03
                          </div>
                          <div className="my-2 h-12 w-px bg-gradient-to-b from-cyan-400 to-emerald-400" />
                        </div>

                        <div className="flex-1 pb-6">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-bold text-white">Repair completed</h4>
                            <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[9px] font-bold tracking-wide text-cyan-300">
                              TECHNICIAN
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Work is carried out and progress is recorded.
                          </p>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="flex gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500 text-lg font-extrabold text-white shadow-lg shadow-emerald-500/20">
                          ✓
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-bold text-white">Issue resolved</h4>
                            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold tracking-wide text-emerald-300">
                              COMPLETED
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            The student can review the completed repair.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-lg text-cyan-200">
                          ✦
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">
                            Nothing gets lost along the way.
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            One connected process. Three accountable roles.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-white/15 bg-[#263653] px-4 py-3 shadow-xl sm:block">
                  <p className="text-[10px] font-bold text-cyan-200">
                    REPORT → RESOLVE
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Every step matters.
                  </p>
                </div>
              </div>
              {/* END REDESIGNED PREVIEW */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
