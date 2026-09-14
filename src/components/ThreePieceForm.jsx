"use client";

import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function ThreePieceForm() {
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
        fabric: form.fabric.value,
        workType: form.workType.value,
        color: form.color.value,
        dupattaDetails: form.dupattaDetails.value,
        imageUrl: uploadData.url,
        description: form.description.value,
      };

      // Step 3: Save to Database API
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/products/three-piece`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">3-Piece Dress Details</h3>
      {success && (
        <div className="p-3 bg-success/10 text-success rounded-lg flex items-center gap-2">
          <FiCheckCircle /> Added to 3-PCs Collection!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" placeholder="Dress Title" required className="p-3 border rounded-xl bg-background" />
        <input type="number" name="price" placeholder="Price (BDT)" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="fabric" placeholder="Fabric Material (Cotton, Silk, etc.)" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="workType" placeholder="Work Type (Embroidery, Print, etc.)" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="color" placeholder="Main Color" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="dupattaDetails" placeholder="Orna / Dupatta Material" className="p-3 border rounded-xl bg-background" />
        
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-semibold">Select Product Image</label>
          <input type="file" name="image" accept="image/*" required className="p-2 border rounded-xl bg-background" />
        </div>

        <textarea name="description" placeholder="Description" rows="3" required className="p-3 border rounded-xl bg-background md:col-span-2" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Uploading Image & Saving..." : "Add 3-Piece Dress"}
      </button>
    </form>
  );
}