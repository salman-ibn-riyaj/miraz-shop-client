// components/ProductCard.jsx
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
    const { _id, title, price, imageUrl, brand } = product;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300">
            {/* Product Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {brand && (
                    <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {brand}
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="mt-4 flex flex-1 flex-col justify-between">
                <h3 className="line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-slate-700">
                    {title}
                </h3>

                {/* Price & Action */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-400">Price</span>
                        <span className="text-xl font-bold text-slate-900">৳{price}</span>
                    </div>

                    <Link
                        href={`/products/${_id}`}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 active:scale-95">
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;