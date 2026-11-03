"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ComplaintTable from "@/components/ComplaintTable";
const stat = "rounded-2xl border border-white bg-white/90 p-5 shadow-[0_10px_30px_rgba(37,43,80,0.05)] ring-1 ring-slate-100";
export default function StudentDashboard() {
  const [items,setItems]=useState([]); const [user,setUser]=useState(null); const [error,setError]=useState("");
  useEffect(()=>{Promise.all([fetch("/api/auth/me").then(r=>r.json()),fetch("/api/complaints").then(r=>r.json())]).then(([u,c])=>{if(!u.user)return window.location.href="/login";if(u.user.role!=="student")return window.location.href=`/${u.user.role}`;setUser(u.user);setItems(c.complaints||[]);setError(c.error||"");}).catch(()=>setError("Could not load dashboard"));},[]);
  const count=s=>items.filter(x=>x.status===s).length;
  const stats=[["Total complaints",items.length,"✦"],["Pending",count("Submitted")+count("Assigned"),"◷"],["In progress",count("Scheduled")+count("In Progress")+count("Reopened"),"↗"],["Resolved",count("Resolved")+count("Closed"),"✓"]];
  return <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14"><div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><span className="text-[11px] font-extrabold tracking-[0.2em] text-primary">STUDENT PORTAL</span><h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Your dashboard</h1><p className="mt-2 text-muted">Welcome back{user?`, ${user.name}`:""}! Here's your maintenance overview.</p></div><Link className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5" href="/student/complaints/new">+ Create complaint</Link></div>
    {error&&<p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<div className="grid grid-cols-2 gap-4 xl:grid-cols-4">{stats.map(([name,value,icon])=><div className={stat} key={name}><div className="flex items-center justify-between"><span className="text-sm font-semibold text-muted">{name}</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 font-bold text-primary">{icon}</span></div><strong className="mt-4 block text-3xl font-extrabold text-ink">{value}</strong></div>)}</div>
    <section className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7"><div className="mb-3 flex items-center justify-between border-b border-line pb-4"><div><h2 className="text-xl font-extrabold">My complaints</h2><p className="mt-1 text-sm text-muted">Track every maintenance request in one place.</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{items.length} total</span></div><ComplaintTable complaints={items} role="student"/></section>
  </div>;
}
