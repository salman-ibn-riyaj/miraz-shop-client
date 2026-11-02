// src/app/api/upload/route.js

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-api";

export async function POST(request) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 6 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be 5 MB or smaller" }, { status: 413 });
    }

    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be 5 MB or smaller" }, { status: 413 });
    }
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(imageFile.type)) {
      return NextResponse.json({ error: "Use a JPEG, PNG, WebP, or GIF image" }, { status: 415 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Image upload is not configured" }, { status: 503 });
    }

    const imgbbFormData = new FormData();
    imgbbFormData.append("image", imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbFormData,
    });

    const data = await res.json();

    if (res.ok && data.success && data.data?.display_url) {
      return NextResponse.json({ url: data.data.display_url }, { headers: { "cache-control": "no-store" } });
    } else {
      return NextResponse.json({ error: "ImgBB upload failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}