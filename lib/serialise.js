export function complaintJSON(item) {
  return { id: String(item._id), title: item.title, category: item.category, hostel: item.hostel, room: item.room, priority: item.priority,
    description: item.description, image: item.image || "", status: item.status,
    student: item.student ? { id: String(item.student._id || item.student), name: item.student.name || "Student", email: item.student.email || "" } : null,
    assignedTo: item.assignedTo ? { id: String(item.assignedTo._id || item.assignedTo), name: item.assignedTo.name || "Technician" } : null,
    scheduledAt: item.scheduledAt, resolutionNote: item.resolutionNote, evidence: item.evidence || "", feedback: item.feedback || "", rating: item.rating,
    timeline: item.timeline || [], createdAt: item.createdAt, updatedAt: item.updatedAt };
}
