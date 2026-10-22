"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

const LANGUAGES = ["English", "Arabic", "Bangla"];

export default function KidsLearningForm() {
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
        pages: Number(formData.get("pages")),
        ageGroup: formData.get("ageGroup"),
        languages: formData.getAll("languages"),
        format: formData.get("format"),
        publisher: formData.get("publisher"),
        imageUrl: uploadData.url,
        description: formData.get("description"),
        collection: "kids_learning",
      };

      // Step 3: Save to Database API
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/products/kids-learning`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
        router.push("/kids-learning");
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
      <h3 className="text-lg font-bold">Kids Learning Book Details</h3>

      {success && (
        <div className="p-3 bg-success/10 text-success rounded-lg flex items-center gap-2">
          <FiCheckCircle /> Added to Kids Learning Collection!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" placeholder="Book Title" required className="p-3 border rounded-xl bg-background md:col-span-2" />
        <input type="number" name="price" placeholder="Price (BDT)" required min="0" className="p-3 border rounded-xl bg-background" />
        <input type="number" name="pages" placeholder="Total Pages (e.g. 62)" required min="1" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="ageGroup" placeholder="Age Group (e.g. 3-6 years)" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="publisher" placeholder="Publisher / Brand" className="p-3 border rounded-xl bg-background" />

        <select name="format" defaultValue="Paperback" className="p-3 border rounded-xl bg-background">
          <option value="Paperback">Paperback</option>
          <option value="Hardcover">Hardcover</option>
          <option value="Digital PDF">Digital PDF</option>
        </select>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Languages</label>
          <div className="flex flex-wrap gap-4 p-3 border rounded-xl bg-background">
            {LANGUAGES.map((lang) => (
              <label key={lang} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="languages" value={lang} defaultChecked />
                {lang}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-semibold">Select Book Cover Image</label>
          <input type="file" name="image" accept="image/*" required className="p-2 border rounded-xl bg-background" />
        </div>

        <textarea name="description" placeholder="Book Description (what children will learn)" rows="3" required className="p-3 border rounded-xl bg-background md:col-span-2" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Uploading Image & Saving..." : "Add Kids Learning Book"}
      </button>
    </form>
  );
}