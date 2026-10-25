// components/TrimmerForm.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

const FEATURES = [
  "Cordless",
  "Waterproof",
  "USB-C Charging",
  "Fast Charging",
  "LED Display",
  "Adjustable Comb",
];

export default function TrimmerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.target;
    const formData = new FormData(form);
    const imageFile = formData.get("image");

    try {
      // Step 1: Image Upload
      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData.url) {
        alert("Image upload failed!");
        return;
      }

      // Step 2: Prepare Data
      const productData = {
        title: formData.get("title"),
        price: Number(formData.get("price")),
        brand: formData.get("brand"),
        model: formData.get("model"),
        type: formData.get("type"),
        batteryLife: Number(formData.get("batteryLife")) || 0, // minutes
        bladeMaterial: formData.get("bladeMaterial"),
        warranty: formData.get("warranty"),
        features: formData.getAll("features"),
        imageUrl: uploadData.url,
        description: formData.get("description"),
        collection: "trimmer",
      };

      // Step 3: Save to Database API
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/products/trimmer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
        router.push("/electronicsandgadgets/trimmer");
      } else {
        alert("Failed to save product!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Trimmer Details</h3>

      {success && (
        <div className="p-3 bg-success/10 text-success rounded-lg flex items-center gap-2">
          <FiCheckCircle /> Added to Trimmer Collection!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" placeholder="Product Title" required className="p-3 border rounded-xl bg-background md:col-span-2" />
        <input type="number" name="price" placeholder="Price (BDT)" required min="0" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="brand" placeholder="Brand (e.g. Philips, Kemei)" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="model" placeholder="Model (e.g. BT3234)" className="p-3 border rounded-xl bg-background" />
        <input type="number" name="batteryLife" placeholder="Battery Life (minutes)" min="0" className="p-3 border rounded-xl bg-background" />

        <select name="type" defaultValue="Beard Trimmer" className="p-3 border rounded-xl bg-background">
          <option value="Beard Trimmer">Beard Trimmer</option>
          <option value="Hair Clipper">Hair Clipper</option>
          <option value="Electric Shaver">Electric Shaver</option>
          <option value="Body Groomer">Body Groomer</option>
          <option value="Multi-Grooming Kit">Multi-Grooming Kit</option>
        </select>

        <select name="bladeMaterial" defaultValue="Stainless Steel" className="p-3 border rounded-xl bg-background">
          <option value="Stainless Steel">Stainless Steel</option>
          <option value="Titanium">Titanium</option>
          <option value="Ceramic">Ceramic</option>
        </select>

        <input type="text" name="warranty" placeholder="Warranty (e.g. 6 months)" className="p-3 border rounded-xl bg-background md:col-span-2" />

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-semibold">Features</label>
          <div className="flex flex-wrap gap-4 p-3 border rounded-xl bg-background">
            {FEATURES.map((feature) => (
              <label key={feature} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="features" value={feature} />
                {feature}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-semibold">Select Product Image</label>
          <input type="file" name="image" accept="image/*" required className="p-2 border rounded-xl bg-background" />
        </div>

        <textarea name="description" placeholder="Product Description (key features, usage)" rows="3" required className="p-3 border rounded-xl bg-background md:col-span-2" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Uploading Image & Saving..." : "Add Trimmer"}
      </button>
    </form>
  );
}