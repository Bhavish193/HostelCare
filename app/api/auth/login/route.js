import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { createSession, safeUser } from "@/lib/auth";
import { loginSchema, firstValidationError } from "@/lib/validation";

export async function POST(request) {
  try {
    let body;
    try { body = await request.json(); }
    catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: firstValidationError(parsed.error), fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { email, password, role } = parsed.data;
    await connectDB();
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    }
    if (user.role !== role) {
      return NextResponse.json({ error: `This account is registered as ${user.role}, not ${role}.` }, { status: 403 });
    }

    await createSession(user._id);
    return NextResponse.json({ message: "Login successful.", user: safeUser(user) });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
