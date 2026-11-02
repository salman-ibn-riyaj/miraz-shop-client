// components/BraceletForm.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function BraceletForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.target;
    const imageFile = form.image.files[0];

    try {
      // Step 1: ImgBB-তে ছবি আপলোড করা
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

      // Step 2: Product Data
      const productData = {
        title: form.title.value,
        price: Number(form.price.value),
        brand: form.brand.value,
        material: form.material.value,
        color: form.color.value,
        length: form.length.value,
        closureType: form.closureType.value,
        imageUrl: uploadData.url,
        description: form.description.value,
      };

      // Step 3: API Request
      const res = await fetch("/api/admin/products/bracelets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();

        // Timeout দিয়ে রিডিরেক্ট নিশ্চিত করা
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 300);
      } else {
        alert("Server returned error response! Check Console.");
      }
    } catch (err) {
      console.error(err);
      alert("Network Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Bracelet Details</h3>

      {success && (
        <div className="p-3 bg-success/10 text-success rounded-lg flex items-center gap-2">
          <FiCheckCircle /> Added to Bracelet Collection!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" placeholder="Bracelet Title" required className="p-3 border rounded-xl bg-background" />
        <input type="number" name="price" placeholder="Price (BDT)" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="brand" placeholder="Brand Name" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="material" placeholder="Material (Leather, Silver, Beads...)" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="color" placeholder="Color" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="length" placeholder="Length / Size (e.g. 18 cm)" className="p-3 border rounded-xl bg-background" />

        <select name="closureType" className="p-3 border rounded-xl bg-background md:col-span-2" defaultValue="">
          <option value="" disabled>Select Closure Type</option>
          <option value="clasp">Clasp</option>
          <option value="magnetic">Magnetic</option>
          <option value="adjustable">Adjustable</option>
          <option value="slip-on">Slip-on</option>
        </select>

        {/* File Input for Image */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-semibold">Select Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="p-2 border rounded-xl bg-background"
          />
        </div>

        <textarea name="description" placeholder="Description" rows="3" required className="p-3 border rounded-xl bg-background md:col-span-2" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Uploading Image & Saving..." : "Add Bracelet"}
      </button>
    </form>
  );
}