// components/OrderForm.jsx
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast"; // 👈 toast ইমপোর্ট করুন

const OrderForm = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = (product?.price || 0) * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        // 👈 সাকসেস টোস্ট
        toast.success("Order submitted successfully!", {
          duration: 4000,
        });
      } else {
        toast.error("Order placing was failed, Please try again!");
      }
    } catch (error) {
      console.error(error);
      toast.error("কোথাও ভুল হচ্ছে, নেটওয়ার্ক চেক করুন!");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
        <h3 className="text-lg font-bold text-emerald-800">
          Order Placed Successfully!
        </h3>
        <p className="text-sm text-emerald-600 mt-1">
          Thank you for ordering. We will call you shortly to confirm.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Hidden Fields for Product Details */}
      <input type="hidden" name="Product ID" value={product?._id} />
      <input type="hidden" name="Product Title" value={product?.title} />
      <input type="hidden" name="Unit Price" value={`৳${product?.price}`} />
      <input type="hidden" name="Total Price" value={`৳${totalPrice}`} />

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Your Full Name
        </label>
        <input
          type="text"
          name="Customer Name"
          required
          placeholder="Enter your name"
          className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Mobile Number
        </label>
        <input
          type="tel"
          name="Customer Phone"
          required
          placeholder="017XXXXXXXX"
          className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Quantity (পরিমাণ)
          </label>
          <input
            type="number"
            name="Quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            required
            className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 font-semibold text-center"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Total Price (মোট দাম)
          </label>
          <div className="w-full p-3 border border-slate-200 rounded-xl bg-slate-100 text-sm font-bold text-indigo-600 flex items-center justify-center">
            ৳{totalPrice}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Delivery Address
        </label>
        <textarea
          name="Customer Address"
          rows="3"
          required
          placeholder="Full address (House no, Road, Area, District)"
          className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        ></textarea>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Note (Optional)
        </label>
        <input
          type="text"
          name="Order Note"
          placeholder="Special instructions..."
          className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 mt-2"
      >
        {loading ? "Placing Order..." : `Confirm Order (৳${totalPrice})`}
      </button>
    </form>
  );
};

export default OrderForm;