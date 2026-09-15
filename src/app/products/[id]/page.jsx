// app/products/[id]/page.jsx
import React from "react";
import OrderForm from "@/components/OrderForm";

async function getSingleProduct(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/single/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h2 className="text-xl font-bold text-slate-700">Product Not Found!</h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Column: Product Info & Image */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl bg-white p-4 border border-slate-200">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-auto max-h-[450px] object-contain rounded-xl"
              />
            </div>
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                {product.brand || "Premium Quality"}
              </span>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                {product.title}
              </h1>
              <p className="text-2xl font-extrabold text-slate-900">
                Price: ৳{product.price}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Right Column: Checkout Order Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Order Confirmation
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your contact details below to place the order.
            </p>

            <OrderForm product={product} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;