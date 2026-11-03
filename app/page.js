import Link from "next/link";

const features = [
  { icon: "⌂", title: "Students", text: "Report problems, attach photos and track every update.", tone: "from-violet-100 to-indigo-50" },
  { icon: "🔧", title: "Technicians", text: "Manage assigned work, schedule repairs and upload proof.", tone: "from-sky-100 to-cyan-50" },
  { icon: "▦", title: "Wardens", text: "Prioritise complaints, assign staff and monitor hostels.", tone: "from-amber-100 to-orange-50" },
];
const steps = [
  ["01", "Report", "Student submits a complaint."],
  ["02", "Assign", "Warden assigns a technician."],
  ["03", "Repair", "Technician completes the work."],
  ["04", "Close", "Student reviews the resolution."],
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden bg-gradient-to-br from-violet-100 via-white to-indigo-100 px-5 py-24 text-center">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-blue-300/25 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <span className="mb-5 inline-flex rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.22em] text-primary shadow-sm">HOSTEL MAINTENANCE MADE SIMPLE</span>
          <h1 className="text-5xl font-extrabold leading-[1.08] tracking-[-0.055em] text-ink sm:text-6xl md:text-7xl">Your hostel.<br/>Your comfort.<br/><span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Our responsibility.</span></h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">Report maintenance issues, track their progress and stay updated until everything is fixed.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link className="rounded-xl bg-gradient-to-r from-primary to-indigo-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-xl" href="/register">Get Started <span className="ml-1">→</span></Link>
            <a className="rounded-xl border border-slate-200 bg-white/90 px-7 py-3.5 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary" href="#how">Learn More</a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-500"><span>✓ Simple reporting</span><span>✓ Clear progress updates</span><span>✓ Accountable repairs</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" id="features">
        <div className="mx-auto mb-12 max-w-xl text-center"><span className="text-xs font-extrabold tracking-[0.2em] text-primary">BUILT FOR EVERYONE</span><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">One platform. Three roles.</h2><p className="mt-3 text-muted">Making hostel maintenance easier for everyone.</p></div>
        <div className="grid gap-5 md:grid-cols-3">{features.map((f) => <article key={f.title} className="group rounded-2xl border border-line bg-white p-7 shadow-[0_12px_40px_rgba(36,43,80,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"><div className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${f.tone} text-2xl text-primary`}>{f.icon}</div><h3 className="text-xl font-bold">{f.title}</h3><p className="mt-2 leading-7 text-muted">{f.text}</p></article>)}</div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 via-indigo-50/70 to-violet-50 px-5 py-20" id="how">
        <div className="mx-auto max-w-7xl"><div className="mb-12 text-center"><span className="text-xs font-extrabold tracking-[0.2em] text-primary">A CLEAR WORKFLOW</span><h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">How it works</h2><p className="mt-3 text-muted">Every complaint has a clear path to resolution.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([n,title,text]) => <div key={n} className="rounded-2xl border border-white bg-white/90 p-6 shadow-sm"><span className="text-3xl font-extrabold text-primary/35">{n}</span><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}</div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-primary to-indigo-500 px-5 py-16 text-center text-white"><h2 className="text-2xl font-extrabold sm:text-3xl">A better hostel starts with a simple report.</h2><p className="mt-3 text-sm text-white/80">Create an account and make maintenance easier.</p><Link className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-lg transition hover:-translate-y-0.5" href="/register">Create your account <span className="ml-2">→</span></Link></section>
    </div>
  );
}
