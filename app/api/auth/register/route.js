
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { createSession, safeUser } from "@/lib/auth";
import {
  registrationSchema,
  firstValidationError,
} from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate registration details
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: firstValidationError(parsed.error),
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password, role, hostel, room } = parsed.data;

    // Connect to MongoDB
    await connectDB();

    // Check whether the email already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered. Please log in." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create account for the selected role
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      hostel: role === "student" ? hostel : "",
      room: role === "student" ? room : "",
    });

    // Automatically log in after registration
    await createSession(user._id);

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: safeUser(user),
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTRATION ERROR:", error);

    const databaseError =
      error.name === "MongooseServerSelectionError" ||
      error.name === "MongoNetworkError";

    return NextResponse.json(
      {
        error: databaseError
          ? "Cannot connect to the database. Check MongoDB Atlas Network Access and cluster status."
          : "Registration failed. Check the server logs for details.",
      },
      { status: 500 }
    );
  }
}
