import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User"; 
import {dbConnect} from "@/lib/db"; 

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ email, password: hashedPassword, role: "admin" });
    await newUser.save();

   
    const token = jwt.sign({ userId: newUser._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ message: "Admin registered successfully", token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
