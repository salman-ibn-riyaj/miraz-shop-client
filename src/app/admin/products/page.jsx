import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import ProductsDashboard from "@/components/admin/ProductsDashboard";

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-default-200 pb-5">
        <div>
          <p className="text-sm font-semibold text-primary">Store management</p>
          <h1 className="mt-1 text-3xl font-bold">Products</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <FiPlus aria-hidden="true" /> Add product
        </Link>
      </header>
      <ProductsDashboard />
    </div>
  );
}