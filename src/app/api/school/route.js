import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import School from "@/models/School";

export async function GET(req) {
  await dbConnect();

  try {
    const host = req.headers.get("host"); 
    const subdomain = host.split(".")[0]; 

    const school = await School.findOne({ subdomain });

    if (!school) {
      console.log("No school found");
      return NextResponse.json({ error: "No school found" }, { status: 404 });
    }

    console.log("School found:", school);
    return NextResponse.json(school);
  } catch (error) {
    console.error("Error fetching school:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
