import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/signin");
  if (session.user?.role !== "admin") redirect("/");

  return <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6">{children}</main>;
}