// app/kids-learning/page.jsx
import React from "react";
import ProductCard from "@/components/ProductCard";

async function getProductsByCollection(collectionName) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/collection/${collectionName}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching kids learning products:", error);
    return [];
  }
}

const KidsLearningPage = async () => {
  // MongoDB collection-এর নাম (আপনার backend-এ এই নামেই product রাখবেন)
  const products = await getProductsByCollection("kids_learning");

  return (
    <main className="min-h-screen bg-slate-50/50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Kids Collection
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Kids Learning Books
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base max-w-xl">
            Fun and colorful books that help children learn English, Arabic and Bangla letters from the very beginning.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id || product.title} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-700">No Books Found</h3>
            <p className="mt-1 text-sm text-slate-500">
              No products found in this collection right now.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default KidsLearningPage;