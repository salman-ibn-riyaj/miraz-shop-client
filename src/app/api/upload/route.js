// src/app/api/upload/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const imgbbFormData = new FormData();
    imgbbFormData.append("image", imageFile);

    // 🔴 ঠিক এই লাইনে process.env.IMGBB_API_KEY টি রয়েছে:
    const apiKey = process.env.IMGBB_API_KEY;

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbFormData,
    });

    const data = await res.json();

    if (data.success) {
      return NextResponse.json({ url: data.data.display_url });
    } else {
      return NextResponse.json({ error: "ImgBB upload failed" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}