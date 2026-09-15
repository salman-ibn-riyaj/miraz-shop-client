"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function CosmeticsForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.target;
    const imageFile = form.image.files[0];

    try {
      // Step 1: ImgBB Upload
      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData.url) {
        alert("Image upload failed!");
        setLoading(false);
        return;
      }

      // Step 2: Prepare Data
      const productData = {
        title: form.title.value,
        price: Number(form.price.value),
        brand: form.brand.value,
        skinType: form.skinType.value,
        volume: form.volume.value,
        origin: form.origin.value,
        imageUrl: uploadData.url,
        description: form.description.value,
      };

      // Step 3: Save to Database API
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/products/cosmetics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
        redirect("/beauty-health"); // সাফল্যের পর বিউটি অ্যান্ড হেলথ পেজে রিডিরেক্ট
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Cosmetics & Beauty Details</h3>
      {success && (
        <div className="p-3 bg-success/10 text-success rounded-lg flex items-center gap-2">
          <FiCheckCircle /> Added to Cosmetics Collection!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" placeholder="Product Title" required className="p-3 border rounded-xl bg-background" />
        <input type="number" name="price" placeholder="Price (BDT)" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="brand" placeholder="Brand Name" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="skinType" placeholder="Skin Type (All, Oily, Dry, etc.)" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="volume" placeholder="Volume / Weight (50ml, 100g)" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="origin" placeholder="Country of Origin" className="p-3 border rounded-xl bg-background" />
        
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-semibold">Select Product Image</label>
          <input type="file" name="image" accept="image/*" required className="p-2 border rounded-xl bg-background" />
        </div>

        <textarea name="description" placeholder="Description & Ingredients" rows="3" required className="p-3 border rounded-xl bg-background md:col-span-2" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Uploading Image & Saving..." : "Add Cosmetics Product"}
      </button>
    </form>
  );
}