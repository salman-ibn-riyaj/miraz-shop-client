import { NextResponse } from "next/server";
import { db } from "@/lib/auth"; // auth.js থেকে সরাসরি db ইমপোর্ট করুন

export async function GET() {
  try {
    // Better Auth 'user' কালেকশনে ডাটা রাখে
    const existingAdmin = await db.collection("user").findOne({ role: "admin" });

    if (existingAdmin) {
      return NextResponse.json({ exists: true });
    }

    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error("Check admin error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", exists: false },
      { status: 500 }
    );
  }
}