import { NextResponse } from "next/server";
import { getAdminSession, signAdminRequest } from "@/lib/admin-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function proxyAdminRequest(request) {
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      const requestOrigin = request.headers.get("origin");
      if (!requestOrigin || requestOrigin !== new URL(request.url).origin) {
        return NextResponse.json({ success: false, message: "Invalid request origin" }, { status: 403 });
      }
    }

    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiBaseUrl) {
      return NextResponse.json({ success: false, message: "Product API is not configured" }, { status: 503 });
    }
    if (!process.env.ADMIN_API_SECRET || process.env.ADMIN_API_SECRET.length < 32) {
      return NextResponse.json({ success: false, message: "Admin API is not configured" }, { status: 503 });
    }

    const url = new URL(request.url);
    const path = `${url.pathname}${url.search}`;
    const body = ["GET", "HEAD"].includes(request.method)
      ? Buffer.alloc(0)
      : Buffer.from(await request.arrayBuffer());
    const { timestamp, signature } = signAdminRequest(request.method, path, body);
    const headers = new Headers({
      "x-admin-timestamp": timestamp,
      "x-admin-signature": signature,
    });
    const contentType = request.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);

    const upstream = await fetch(`${apiBaseUrl.replace(/\/$/, "")}${path}`, {
      method: request.method,
      headers,
      body: body.length ? body : undefined,
      cache: "no-store",
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") || "application/json",
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    console.error("Admin API proxy failed:", error);
    return NextResponse.json({ success: false, message: "Admin request failed" }, { status: 500 });
  }
}

export const GET = proxyAdminRequest;
export const POST = proxyAdminRequest;
export const PUT = proxyAdminRequest;
export const PATCH = proxyAdminRequest;
export const DELETE = proxyAdminRequest;