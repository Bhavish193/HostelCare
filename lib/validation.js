import { z } from "zod";

const email = z.string().trim().toLowerCase()
  .min(1, "Email is required.")
  .email("Please enter a valid email address.")
  .max(254, "Email address is too long.");

const strongPassword = z.string()
  .min(8, "Password must be at least 8 characters long.")
  .max(128, "Password must be 128 characters or fewer.")
  .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character.");

const accountRole = z.enum(["student", "technician", "admin"], {
  errorMap: () => ({ message: "Choose a valid account type." }),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required."),
  role: accountRole,
});

// All three account types can register. Hostel and room are student-only fields.
export const registrationSchema = z.object({
  name: z.string().trim().min(1, "Full name is required.").max(100, "Name must be 100 characters or fewer."),
  email,
  password: strongPassword,
  role: accountRole,
  hostel: z.string().trim().max(100, "Hostel must be 100 characters or fewer.").optional().default(""),
  room: z.string().trim().max(30, "Room number must be 30 characters or fewer.").optional().default(""),
}).superRefine((data, ctx) => {
  if (data.role === "student") {
    if (!data.hostel) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["hostel"], message: "Hostel is required for students." });
    if (!data.room) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["room"], message: "Room number is required for students." });
  }
});

// Kept for the admin dashboard's Add Technician form.
export const technicianSchema = z.object({
  name: z.string().trim().min(1, "Technician name is required.").max(100, "Name must be 100 characters or fewer."),
  email,
  password: strongPassword,
});

const imageData = z.string()
  .refine((value) => value === "" || /^data:image\/(png|jpeg|jpg|webp);base64,/.test(value), "Upload a PNG, JPG or WebP image.")
  .refine((value) => value.length <= 700000, "Image must be smaller than 500 KB.");

export const complaintSchema = z.object({
  title: z.string().trim().min(1, "Complaint title is required.").max(120, "Title must be 120 characters or fewer."),
  category: z.enum(["Electrical", "Plumbing", "Furniture", "Civil", "Cleaning", "Other"], { errorMap: () => ({ message: "Choose a valid complaint category." }) }),
  hostel: z.string().trim().min(1, "Hostel is required.").max(100, "Hostel must be 100 characters or fewer."),
  room: z.string().trim().min(1, "Room number is required.").max(30, "Room number must be 30 characters or fewer."),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
  description: z.string().trim().min(1, "Please describe the issue.").max(3000, "Description must be 3000 characters or fewer."),
  image: imageData.optional().default(""),
});

export const technicianUpdateSchema = z.object({
  status: z.enum(["Scheduled", "In Progress", "Resolved"]).optional(),
  scheduledAt: z.union([z.string().refine((value) => !Number.isNaN(new Date(value).getTime()), "Enter a valid scheduled date."), z.literal(""), z.null()]).optional(),
  resolutionNote: z.string().max(2000, "Resolution note must be 2000 characters or fewer.").optional(),
  evidence: imageData.optional(),
  message: z.string().max(200, "Update message is too long.").optional(),
});

export const adminUpdateSchema = z.object({
  status: z.enum(["Assigned", "Scheduled", "In Progress", "Resolved", "Closed", "Reopened"]).optional(),
  resolutionNote: z.string().max(2000, "Resolution note must be 2000 characters or fewer.").optional(),
  message: z.string().max(200, "Update message is too long.").optional(),
});

export const studentFeedbackSchema = z.object({
  status: z.literal("Reopened").optional(),
  feedback: z.string().trim().max(1500, "Feedback must be 1500 characters or fewer.").optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
}).refine((data) => data.status === "Reopened" || (data.feedback && data.rating), {
  message: "Provide feedback and a rating from 1 to 5, or reopen the complaint.",
});

export const assignmentSchema = z.object({
  technicianId: z.string().regex(/^[a-f\d]{24}$/i, "Select a valid technician."),
});

export function firstValidationError(error) {
  return error.issues?.[0]?.message || "Please check the information you entered.";
}
