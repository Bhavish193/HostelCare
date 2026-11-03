"use client";

import { useState } from "react";
import Link from "next/link";
import { complaintSchema } from "@/lib/validation";

const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";
const label = "flex flex-col gap-2 text-sm font-semibold text-slate-700";
const errorText = "mt-1 text-xs font-medium text-red-600";

export default function NewComplaintPage() {
  const [form, setForm] = useState({ title: "", category: "", hostel: "", room: "", priority: "Medium", description: "" });
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function change(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setError("");
  }

  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Please upload a PNG, JPG or WebP image.");
      e.target.value = "";
      return;
    }
    if (file.size > 500000) {
      setError("Choose an image smaller than 500 KB.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(String(reader.result || ""));
      setErrors((current) => ({ ...current, image: "" }));
      setError("");
    };
    reader.readAsDataURL(file);
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setErrors({});
    const parsed = complaintSchema.safeParse({ ...form, image });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0] || ""])));
      setError("Please correct the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to submit complaint.");
        return;
      }
      window.location.href = `/student/complaints/${data.complaint.id}`;
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-9 sm:px-8 sm:py-12">
      <Link className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark" href="/student">← Back to dashboard</Link>
      <form noValidate className="rounded-3xl border border-white bg-white p-6 shadow-[0_18px_60px_rgba(34,42,82,0.08)] ring-1 ring-slate-100 sm:p-9" onSubmit={submit}>
        <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.2em] text-primary">STUDENT PORTAL</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">New complaint</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Tell us what's wrong. We'll make sure it reaches the right person.</p>
        {error && <p role="alert" className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="mt-7 space-y-5">
          <label className={label}>Complaint title
            <input className={field} name="title" placeholder="e.g. Fan not working" value={form.title} onChange={change} />
            {errors.title && <span className={errorText}>{errors.title}</span>}
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={label}>Category
              <select className={field} name="category" value={form.category} onChange={change}>
                <option value="">Select category</option>{["Electrical", "Plumbing", "Furniture", "Civil", "Cleaning", "Other"].map((item) => <option key={item}>{item}</option>)}
              </select>
              {errors.category && <span className={errorText}>{errors.category}</span>}
            </label>
            <label className={label}>Priority
              <select className={field} name="priority" value={form.priority} onChange={change}><option>Low</option><option>Medium</option><option>High</option></select>
              {errors.priority && <span className={errorText}>{errors.priority}</span>}
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={label}>Hostel
              <input className={field} name="hostel" value={form.hostel} onChange={change} placeholder="Hostel name" />
              {errors.hostel && <span className={errorText}>{errors.hostel}</span>}
            </label>
            <label className={label}>Room number
              <input className={field} name="room" value={form.room} onChange={change} placeholder="Room number" />
              {errors.room && <span className={errorText}>{errors.room}</span>}
            </label>
          </div>

          <label className={label}>Description
            <textarea className={`${field} resize-y`} name="description" rows="5" value={form.description} onChange={change} placeholder="Describe the issue and when it started..." />
            {errors.description && <span className={errorText}>{errors.description}</span>}
          </label>

          <label className={label}>Attach photo <span className="font-normal text-muted">(optional)</span>
            <input className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm" type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} />
            <small className="font-normal text-muted">PNG, JPG or WebP · Maximum 500 KB.</small>
            {errors.image && <span className={errorText}>{errors.image}</span>}
          </label>
          {image && <div className="space-y-2"><img className="max-h-64 rounded-xl border border-line object-contain" src={image} alt="Complaint preview" /><button type="button" className="text-xs font-bold text-red-600" onClick={() => setImage("")}>Remove image</button></div>}
        </div>

        <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-primary to-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 disabled:opacity-60" disabled={loading}>{loading ? "Submitting..." : "Submit complaint →"}</button>
      </form>
    </div>
  );
}
