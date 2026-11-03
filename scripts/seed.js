import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Set MONGODB_URI in .env before seeding");
await mongoose.connect(uri);
const accounts = [
 { name:"Hostel Warden", email:"admin@hostelcare.com", password:"Admin@123", role:"admin" },
 { name:"Ravi Technician", email:"technician@hostelcare.com", password:"Tech@123", role:"technician" },
 { name:"Aman Student", email:"student@hostelcare.com", password:"Student@123", role:"student", hostel:"Block A", room:"312" }
];
for (const account of accounts) {
 const password = await bcrypt.hash(account.password,10);
 await User.findOneAndUpdate({email:account.email},{...account,password},{upsert:true,new:true,setDefaultsOnInsert:true});
}
console.log("Demo accounts created:");
console.log("Admin: admin@hostelcare.com / Admin@123");
console.log("Technician: technician@hostelcare.com / Tech@123");
console.log("Student: student@hostelcare.com / Student@123");
await mongoose.disconnect();
