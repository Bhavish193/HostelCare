import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({ status: String, message: String, by: String, at: { type: Date, default: Date.now } }, { _id: false });
const ComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true }, category: { type: String, required: true }, hostel: { type: String, required: true }, room: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" }, description: { type: String, required: true }, image: { type: String, default: "" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  status: { type: String, enum: ["Submitted", "Assigned", "Scheduled", "In Progress", "Resolved", "Closed", "Reopened"], default: "Submitted" },
  scheduledAt: { type: Date, default: null }, resolutionNote: { type: String, default: "" }, evidence: { type: String, default: "" }, feedback: { type: String, default: "" },
  rating: { type: Number, min: 1, max: 5, default: null }, timeline: { type: [EventSchema], default: [] }
}, { timestamps: true });
export default mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
