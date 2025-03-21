import { dbConnect } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await dbConnect();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


  const { subdomain, name, description, contact } = await req.json();

  const existingSchool = await School.findOne({ subdomain });


  if (!existingSchool) {
    return NextResponse.json({ error: "School not found!" }, { status: 404 });
  }

  const school = await School.findOneAndUpdate(
    { subdomain },
    { name, description, contact },
    { new: true, runValidators: true }
  );


  return NextResponse.json({ message: "School Updated!", school });
}
