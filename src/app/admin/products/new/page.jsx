import Link from "next/link";
import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";
import CategorySelector from "@/components/CategorySelector";

export default function NewAdminProductPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/products" className="mb-5 inline-flex items-center gap-2 text-sm text-default-500 hover:text-foreground">
        <FiArrowLeft aria-hidden="true" /> Products
      </Link>
      <div className="mb-6 flex items-center gap-3">
        <FiPlusCircle className="h-7 w-7 text-primary" aria-hidden="true" />
        <h1 className="text-2xl font-bold">Add product</h1>
      </div>
      <CategorySelector />
    </div>
  );
}