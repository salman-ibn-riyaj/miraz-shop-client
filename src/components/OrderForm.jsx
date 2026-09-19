// components/OrderForm.jsx
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const OrderForm = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState("inside"); // 'inside' or 'outside'

  const unitPrice = product?.price || 0;
  const deliveryCharge = deliveryArea === "inside" ? 60 : 120;
  const subTotal = unitPrice * quantity;
  const grandTotal = subTotal + deliveryCharge;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xjyvnzge", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        toast.success("Order submitted successfully!", {
          duration: 4000,
        });
      } else {
        toast.error("Order placing failed, Please try again!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error, Please check your connection!");
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
      {/* Hidden Fields for Formspree Submission */}
      <input type="hidden" name="Product ID" value={product?._id} />
      <input type="hidden" name="Product Title" value={product?.title} />
      <input type="hidden" name="Unit Price" value={`৳${unitPrice}`} />
      <input type="hidden" name="Delivery Charge" value={`৳${deliveryCharge}`} />
      <input type="hidden" name="Total Price" value={`৳${grandTotal}`} />

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

      {/* Delivery Location Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Delivery Area (ডেলিভারি এলাকা)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
              deliveryArea === "inside"
                ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold"
                : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="Delivery Area"
                value="Inside Dhaka"
                checked={deliveryArea === "inside"}
                onChange={() => setDeliveryArea("inside")}
                className="accent-indigo-600"
              />
              <span className="text-xs sm:text-sm">Inside Dhaka</span>
            </div>
            <span className="text-xs font-bold">৳60</span>
          </label>

          <label
            className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
              deliveryArea === "outside"
                ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold"
                : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="Delivery Area"
                value="Outside Dhaka"
                checked={deliveryArea === "outside"}
                onChange={() => setDeliveryArea("outside")}
                className="accent-indigo-600"
              />
              <span className="text-xs sm:text-sm">Outside Dhaka</span>
            </div>
            <span className="text-xs font-bold">৳120</span>
          </label>
        </div>
      </div>

      {/* Quantity & Total Calculation */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Quantity (পরিমাণ)
          </label>
          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-100 active:scale-95 transition-all"
            >
              −
            </button>
            <input
              type="number"
              name="Quantity"
              value={quantity}
              readOnly
              className="w-full text-center bg-transparent font-bold text-slate-900 text-base focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-100 active:scale-95 transition-all"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Total Price (সর্বমোট)
          </label>
          <div className="w-full h-12 border border-slate-200 rounded-xl bg-slate-100 text-base font-bold text-indigo-600 flex items-center justify-center">
            ৳{grandTotal}
          </div>
        </div>
      </div>

      {/* Price Summary Breakdown */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-semibold text-slate-800">৳{subTotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charge:</span>
          <span className="font-semibold text-slate-800">৳{deliveryCharge}</span>
        </div>
        <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900 text-sm">
          <span>Grand Total:</span>
          <span className="text-indigo-600">৳{grandTotal}</span>
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
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 active:scale-[0.99] shadow-lg shadow-indigo-600/20"
      >
        {loading ? "Placing Order..." : `Confirm Order (৳${grandTotal})`}
      </button>
    </form>
  );
};

export default OrderForm;