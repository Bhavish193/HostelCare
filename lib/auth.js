
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { connectDB } from "@/lib/db";
import User from "@/models/User";

const secretValue = process.env.JWT_SECRET;

if (!secretValue) {
  throw new Error("JWT_SECRET is missing from .env");
}

const secret = new TextEncoder().encode(secretValue);

const COOKIE = "hostelcare_token";

// Create a login session
export async function createSession(userId) {
  const token = await new SignJWT({
    userId: String(userId),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const store = await cookies();

  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 604800,
  });
}

// Get currently logged-in user
export async function getCurrentUser() {
  try {
    const token = (await cookies()).get(COOKIE)?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secret);

    await connectDB();

    return await User.findById(payload.userId)
      .select("-password")
      .lean();

  } catch {
    return null;
  }
}

// Check authentication and permissions
export async function requireUser(roles = []) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Please log in",
      status: 401,
    };
  }

  if (roles.length && !roles.includes(user.role)) {
    return {
      error: "You are not allowed to do this",
      status: 403,
    };
  }

  return { user };
}

// Return safe user information
export function safeUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    hostel: user.hostel,
    room: user.room,
  };
}
