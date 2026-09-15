"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function MensWatchForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setSuccess(false);

  //   const form = e.target;
  //   const imageFile = form.image.files[0];

  //   try {
  //     // Step 1: ImgBB-তে ছবি আপলোড করা
  //     const uploadFormData = new FormData();
  //     uploadFormData.append("image", imageFile);

  //     const uploadRes = await fetch("/api/upload", {
  //       method: "POST",
  //       body: uploadFormData,
  //     });

  //     const uploadData = await uploadRes.json();

  //     if (!uploadRes.ok || !uploadData.url) {
  //       alert("Image upload failed!");
  //       setLoading(false);
  //       return;
  //     }

  //     // Step 2: ImgBB থেকে পাওয়া URL সহ প্রোডাক্ট ডাটা সাজানো
  //     const productData = {
  //       title: form.title.value,
  //       price: Number(form.price.value),
  //       brand: form.brand.value,
  //       waterResistance: form.waterResistance.value,
  //       strapMaterial: form.strapMaterial.value,
  //       movementType: form.movementType.value,
  //       imageUrl: uploadData.url, // <-- ImgBB Direct Image URL
  //       description: form.description.value,
  //     };

  //     // Step 3: ডাটাবেসে সেভ করার API এ পাঠানো
  //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  //     const res = await fetch(`${baseUrl}/api/products/mens-watch`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(productData),
  //     });

  //     if (res.ok) {
  //       setSuccess(true);
  //       form.reset();
  //       router.push("/electronicsandgadgets/watches/menswatch");
  //       router.refresh(); // সাফল্যের পর মেনস ওয়াচ পেজে রিডিরেক্ট
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        waterResistance: form.waterResistance.value,
        strapMaterial: form.strapMaterial.value,
        movementType: form.movementType.value,
        imageUrl: uploadData.url,
        description: form.description.value,
      };

      // Step 3: API Request
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/products/mens-watch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
        
        // Timeout দিয়ে রিডিরেক্ট নিশ্চায়ন
        setTimeout(() => {
          router.push("/electronicsandgadgets/watches/menswatch");
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
      <h3 className="text-lg font-bold">Men's Watch Details</h3>
      {success && (
        <div className="p-3 bg-success/10 text-success rounded-lg flex items-center gap-2">
          <FiCheckCircle /> Added to Men's Watch Collection!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" placeholder="Watch Title" required className="p-3 border rounded-xl bg-background" />
        <input type="number" name="price" placeholder="Price (BDT)" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="brand" placeholder="Brand Name" required className="p-3 border rounded-xl bg-background" />
        <input type="text" name="waterResistance" placeholder="Water Resistance" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="strapMaterial" placeholder="Strap Material" className="p-3 border rounded-xl bg-background" />
        <input type="text" name="movementType" placeholder="Movement" className="p-3 border rounded-xl bg-background" />
        
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
        {loading ? "Uploading Image & Saving..." : "Add Men's Watch"}
      </button>
    </form>
  );
}