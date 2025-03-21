import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    
    return NextResponse.json({ message: "Database Connected Successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Database Connection Failed!" }, { status: 500 });
  }
}
