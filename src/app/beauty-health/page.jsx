// app/beauty-and-health/page.jsx (বা আপনার Beauty and Health Page-এর লোকেশন অনুযায়ী)
import React from "react";
import ProductCard from "@/components/ProductCard";

async function getProductsByCollection(collectionName) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/collection/${collectionName}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching Beauty & Health products:", error);
    return [];
  }
}

const BeautyAndHealthPage = async () => {
  // আপনার MongoDB কালেকশনের নাম অনুযায়ী "beautyAndHealth" (বা আপনার তৈরি কালেকশনের নাম) পাঠানো হয়েছে
  const products = await getProductsByCollection("cosmetics");

  return (
    <main className="min-h-screen bg-slate-50/50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Self-Care & Skincare Essentials
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Beauty & Health Collection
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base max-w-xl">
            Discover premium skincare solutions, personal care items, and wellness products designed to enhance your daily self-care routine.
          </p>
        </div>

        {/* Product Grid / Empty State */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id || product.title} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-700">No Products Found</h3>
            <p className="mt-1 text-sm text-slate-500">
              We couldn't find any beauty & health products in this collection at this moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default BeautyAndHealthPage;