// app/three-pieces/page.jsx (বা আপনার Three Piece Page-এর লোকেশন অনুযায়ী)
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
    console.error("Error fetching Three Piece suits:", error);
    return [];
  }
}

const ThreePiecesPage = async () => {
  // আপনার MongoDB কালেকশনের নাম অনুযায়ী "threePieces" পাঠানো হয়েছে
  const products = await getProductsByCollection("three_pieces");

  return (
    <main className="min-h-screen bg-slate-50/50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Festive & Casual Wear
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Women's 3-Piece Collection
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base max-w-xl">
            Explore premium embroidered lawn, silk, and cotton 3-piece ensembles crafted for comfort and festive style.
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
            <h3 className="text-lg font-semibold text-slate-700">No Suits Found</h3>
            <p className="mt-1 text-sm text-slate-500">
              We couldn't find any 3-piece suits in this collection at this moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ThreePiecesPage;