import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireUser } from "@/lib/auth";
import { technicianSchema, firstValidationError } from "@/lib/validation";

export async function GET() {
  const auth = await requireUser(["admin"]);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  await connectDB();
  const users = await User.find({ role: "technician" }).select("name email").sort({ name: 1 }).lean();
  return NextResponse.json({ users: users.map((user) => ({ id: String(user._id), name: user.name, email: user.email })) });
}

export async function POST(request) {
  const auth = await requireUser(["admin"]);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    let body;
    try { body = await request.json(); }
    catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

    const parsed = technicianSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: firstValidationError(parsed.error), fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    await connectDB();
    if (await User.findOne({ email })) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
    }

    const user = await User.create({
      name, email, password: await bcrypt.hash(password, 12), role: "technician",
    });
    return NextResponse.json({ user: { id: String(user._id), name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error("Technician creation error:", error);
    return NextResponse.json({ error: "Could not create technician account." }, { status: 500 });
  }
}
