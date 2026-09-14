import CategorySelector from "@/components/CategorySelector";
import { auth } from "@/lib/auth"; // আপনার Better Auth ইন্সট্যান্স
import { headers } from "next/headers";
import { FiAlertCircle, FiPlusCircle } from "react-icons/fi";

export default async function AddProductPage() {
  // সার্ভার সাইডে Session চেক
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ইউজার অ্যাডমিন না হলে সার্ভার থেকেই এক্সেস ব্লক
  if (!session || session.user?.role !== "admin") {
    return (
      <div className="max-w-md mx-auto my-16 p-6 border border-danger/30 bg-danger/5 rounded-2xl text-center flex flex-col items-center gap-3">
        <FiAlertCircle className="h-12 w-12 text-danger" />
        <h2 className="text-xl font-bold text-danger">Access Denied</h2>
        <p className="text-sm text-default-500">
          Only administrators have permission to add new products.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <FiPlusCircle className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-extrabold tracking-tight">Add New Product</h1>
      </div>

      {/* Client Component: Dynamic Form Switcher */}
      <CategorySelector />
    </div>
  );
}