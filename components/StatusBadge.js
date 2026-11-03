export default function StatusBadge({ status }) {
  const key = String(status || "Submitted").toLowerCase().replaceAll(" ", "-");
  const tones = { submitted: "bg-amber-50 text-amber-700 ring-amber-200", assigned: "bg-violet-50 text-violet-700 ring-violet-200", scheduled: "bg-blue-50 text-blue-700 ring-blue-200", "in-progress": "bg-sky-50 text-sky-700 ring-sky-200", reopened: "bg-orange-50 text-orange-700 ring-orange-200", resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200", closed: "bg-slate-100 text-slate-600 ring-slate-200" };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ring-1 ring-inset ${tones[key] || "bg-slate-100 text-slate-600 ring-slate-200"}`}>{status || "Submitted"}</span>;
}
