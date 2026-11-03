import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { requireUser } from "@/lib/auth";
import { complaintJSON } from "@/lib/serialise";
import {
  adminUpdateSchema, technicianUpdateSchema, studentFeedbackSchema, firstValidationError,
} from "@/lib/validation";

const TRANSITIONS = {
  Submitted: ["Assigned"],
  Assigned: ["Scheduled", "In Progress"],
  Scheduled: ["In Progress"],
  "In Progress": ["Resolved"],
  Resolved: ["Closed", "Reopened"],
  Closed: ["Reopened"],
  Reopened: ["Assigned", "In Progress"],
};

export async function GET(request, { params }) {
  const auth = await requireUser();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid complaint ID." }, { status: 400 });

  await connectDB();
  const item = await Complaint.findById(id)
    .populate("student", "name email").populate("assignedTo", "name").lean();
  if (!item) return NextResponse.json({ error: "Complaint not found." }, { status: 404 });

  const owner = String(item.student._id) === String(auth.user._id);
  const technician = item.assignedTo && String(item.assignedTo._id) === String(auth.user._id);
  if (auth.user.role === "student" && !owner) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  if (auth.user.role === "technician" && !technician) return NextResponse.json({ error: "Not assigned to you." }, { status: 403 });
  return NextResponse.json({ complaint: complaintJSON(item) });
}

export async function PATCH(request, { params }) {
  const auth = await requireUser();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid complaint ID." }, { status: 400 });

  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  await connectDB();
  const item = await Complaint.findById(id);
  if (!item) return NextResponse.json({ error: "Complaint not found." }, { status: 404 });

  const owner = String(item.student) === String(auth.user._id);
  const assigned = item.assignedTo && String(item.assignedTo) === String(auth.user._id);
  let data;
  let message = "Complaint updated";

  if (auth.user.role === "admin") {
    const parsed = adminUpdateSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: firstValidationError(parsed.error) }, { status: 400 });
    data = parsed.data;
    if (data.status) {
      if (!TRANSITIONS[item.status]?.includes(data.status)) {
        return NextResponse.json({ error: `Invalid status transition from ${item.status} to ${data.status}.` }, { status: 400 });
      }
      item.status = data.status;
    }
    if (data.resolutionNote !== undefined) item.resolutionNote = data.resolutionNote.trim();
    message = data.message || "Updated by warden/admin";
  } else if (auth.user.role === "technician" && assigned) {
    const parsed = technicianUpdateSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: firstValidationError(parsed.error) }, { status: 400 });
    data = parsed.data;
    if (data.status) {
      if (!TRANSITIONS[item.status]?.includes(data.status)) {
        return NextResponse.json({ error: `Invalid status transition from ${item.status} to ${data.status}.` }, { status: 400 });
      }
      item.status = data.status;
    }
    if (data.scheduledAt !== undefined) {
      item.scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : null;
    }
    if (data.resolutionNote !== undefined) item.resolutionNote = data.resolutionNote.trim();
    if (data.evidence !== undefined) item.evidence = data.evidence;
    message = data.message || "Technician updated the work";
  } else if (auth.user.role === "student" && owner) {
    const parsed = studentFeedbackSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: firstValidationError(parsed.error) }, { status: 400 });
    data = parsed.data;
    if (data.status === "Reopened" && ["Resolved", "Closed"].includes(item.status)) {
      item.status = "Reopened";
      message = "Student reopened the complaint";
    } else if (data.feedback && data.rating) {
      item.feedback = data.feedback;
      item.rating = data.rating;
      if (item.status === "Resolved") item.status = "Closed";
      message = "Student submitted feedback";
    } else {
      return NextResponse.json({ error: "This complaint cannot be reopened in its current status." }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "You are not allowed to update this complaint." }, { status: 403 });
  }

  item.timeline.push({ status: item.status, message, by: auth.user.name });
  await item.save();
  const updated = await Complaint.findById(id)
    .populate("student", "name email").populate("assignedTo", "name").lean();
  return NextResponse.json({ complaint: complaintJSON(updated) });
}
