import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import User from "@/models/User";
import { requireUser } from "@/lib/auth";
import { complaintJSON } from "@/lib/serialise";
import { assignmentSchema, firstValidationError } from "@/lib/validation";

export async function PATCH(request, { params }) {
  const auth = await requireUser(["admin"]);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid complaint ID." }, { status: 400 });
    }

    let body;
    try { body = await request.json(); }
    catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

    const parsed = assignmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: firstValidationError(parsed.error) }, { status: 400 });
    }

    await connectDB();
    const [technician, complaint] = await Promise.all([
      User.findOne({ _id: parsed.data.technicianId, role: "technician" }),
      Complaint.findById(id),
    ]);
    if (!technician) return NextResponse.json({ error: "That account is not a registered technician." }, { status: 400 });
    if (!complaint) return NextResponse.json({ error: "Complaint not found." }, { status: 404 });

    complaint.assignedTo = technician._id;
    complaint.status = "Assigned";
    complaint.timeline.push({ status: "Assigned", message: `Assigned to ${technician.name}`, by: auth.user.name });
    await complaint.save();

    const updated = await Complaint.findById(id)
      .populate("student", "name email").populate("assignedTo", "name").lean();
    return NextResponse.json({ message: "Technician assigned successfully.", complaint: complaintJSON(updated) });
  } catch (error) {
    console.error("Assignment error:", error);
    return NextResponse.json({ error: "Could not assign technician." }, { status: 500 });
  }
}
