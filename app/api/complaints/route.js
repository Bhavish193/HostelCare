import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { requireUser } from "@/lib/auth";
import { complaintJSON } from "@/lib/serialise";
import { complaintSchema, firstValidationError } from "@/lib/validation";

const CATEGORIES = ["Electrical", "Plumbing", "Furniture", "Civil", "Cleaning", "Other"];
const PRIORITIES = ["Low", "Medium", "High"];
const STATUSES = ["Submitted", "Assigned", "Scheduled", "In Progress", "Resolved", "Closed", "Reopened"];

export async function GET(request) {
  const auth = await requireUser();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  await connectDB();

  const { searchParams } = new URL(request.url);
  const filter = auth.user.role === "student"
    ? { student: auth.user._id }
    : auth.user.role === "technician" ? { assignedTo: auth.user._id } : {};

  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const priority = searchParams.get("priority");
  const search = searchParams.get("search")?.trim().slice(0, 100);

  if (status && STATUSES.includes(status)) filter.status = status;
  if (category && CATEGORIES.includes(category)) filter.category = category;
  if (priority && PRIORITIES.includes(priority)) filter.priority = priority;
  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { title: { $regex: escaped, $options: "i" } },
      { hostel: { $regex: escaped, $options: "i" } },
      { room: { $regex: escaped, $options: "i" } },
    ];
  }

  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(searchParams.get("limit") || "25", 10) || 25));
  const [items, total] = await Promise.all([
    Complaint.find(filter).populate("student", "name email").populate("assignedTo", "name")
      .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Complaint.countDocuments(filter),
  ]);
  return NextResponse.json({
    complaints: items.map(complaintJSON),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function POST(request) {
  const auth = await requireUser(["student"]);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    let body;
    try { body = await request.json(); }
    catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

    const parsed = complaintSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: firstValidationError(parsed.error), fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = parsed.data;
    await connectDB();
    const complaint = await Complaint.create({
      ...data,
      student: auth.user._id,
      timeline: [{ status: "Submitted", message: "Complaint submitted by student", by: auth.user.name }],
    });
    return NextResponse.json({ complaint: complaintJSON(complaint) }, { status: 201 });
  } catch (error) {
    console.error("Complaint submission error:", error);
    return NextResponse.json({ error: "Could not submit complaint." }, { status: 500 });
  }
}
