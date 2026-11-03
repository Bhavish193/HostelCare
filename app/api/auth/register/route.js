import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { createSession, safeUser } from "@/lib/auth";
import { registrationSchema, firstValidationError } from "@/lib/validation";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: firstValidationError(parsed.error), fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password, role, hostel, room } = parsed.data;
    await connectDB();

    if (await User.findOne({ email })) {
      return NextResponse.json({ error: "Email is already registered. Please log in." }, { status: 409 });
    }

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role,
      hostel: role === "student" ? hostel : "",
      room: role === "student" ? room : "",
    });

    await createSession(user._id);
    return NextResponse.json(
      { message: "Account created successfully.", user: safeUser(user) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Could not create account. Please try again." }, { status: 500 });
  }
}
