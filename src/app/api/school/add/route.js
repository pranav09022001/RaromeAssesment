import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import School from "@/models/School";

export async function POST(req) {
  await dbConnect();

  try {
    const { subdomain, name, description, contact } = await req.json();

    if (!subdomain || !name) {
      return NextResponse.json(
        { error: "Missing required fields: subdomain, domain, and name are required." },
        { status: 400 }
      );
    }

    const existingSchool = await School.findOne({ subdomain });
    if (existingSchool) {
      return NextResponse.json(
        { error: `School with domain '${subdomain}' already exists.` },
        { status: 400 }
      );
    }


    const school = new School({ subdomain, name, description, contact });
    await school.save();

    return NextResponse.json({ message: "School Created", school });
  } catch (error) {
    console.error("Server Error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: `Duplicate Entry: A school with the domain '${error.keyValue.subdomain}' already exists.` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
