import { createHash, createHmac } from "node:crypto";
import { auth } from "@/lib/auth";

export async function getAdminSession(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user?.role === "admin" ? session : null;
}

export function signAdminRequest(method, path, body) {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_API_SECRET must contain at least 32 characters");

  const timestamp = Date.now().toString();
  const bodyHash = createHash("sha256").update(body).digest("hex");
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}\n${method.toUpperCase()}\n${path}\n${bodyHash}`)
    .digest("hex");

  return { timestamp, signature };
}