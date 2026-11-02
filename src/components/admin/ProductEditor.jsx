"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

const hiddenFields = new Set(["_id", "createdAt", "updatedAt", "category"]);

function labelFor(field) {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

export default function ProductEditor({ category, productId }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/products/${category}/${productId}`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Could not load product");
        setProduct(result.data);
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [category, productId]);

  const updateField = (field, value) => {
    setProduct((current) => ({ ...current, [field]: value }));
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      let imageUrl = product.imageUrl;
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("image", imageFile);
        const uploadResponse = await fetch("/api/upload", { method: "POST", body: uploadData });
        const uploaded = await uploadResponse.json();
        if (!uploadResponse.ok || !uploaded.url) throw new Error(uploaded.error || "Image upload failed");
        imageUrl = uploaded.url;
      }

      const { _id, category: productCategory, createdAt, updatedAt, ...fields } = product;
      const response = await fetch(`/api/admin/products/${category}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, imageUrl }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not save product");
      router.push("/admin/products");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="mx-auto max-w-3xl py-10 text-default-500">Loading product...</p>;
  if (error && !product) return <p role="alert" className="mx-auto max-w-3xl py-10 text-danger">{error}</p>;
  if (!product) return <p className="mx-auto max-w-3xl py-10 text-default-500">Product not found.</p>;

  const fields = Object.entries(product).filter(([field]) => !hiddenFields.has(field));

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/products" className="mb-5 inline-flex items-center gap-2 text-sm text-default-500 hover:text-foreground">
        <FiArrowLeft aria-hidden="true" /> Products
      </Link>
      <h1 className="mb-6 text-2xl font-bold">Edit product</h1>
      <form onSubmit={saveProduct} className="space-y-5">
        {error && <p role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{error}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([field, value]) => (
            <label key={field} className={`flex flex-col gap-1.5 text-sm font-medium ${field === "description" ? "sm:col-span-2" : ""}`}>
              {labelFor(field)}
              {Array.isArray(value) ? (
                <textarea
                  value={value.join(", ")}
                  onChange={(event) => updateField(field, event.target.value.split(",").map((item) => item.trim()).filter(Boolean))}
                  rows={3}
                  className="rounded-md border border-default-300 bg-background px-3 py-2 font-normal"
                />
              ) : typeof value === "number" ? (
                <input
                  type="number"
                  step="any"
                  value={value}
                  onChange={(event) => updateField(field, event.target.value === "" ? 0 : Number(event.target.value))}
                  className="rounded-md border border-default-300 bg-background px-3 py-2 font-normal"
                />
              ) : field === "imageUrl" ? (
                <input
                  type="url"
                  value={value || ""}
                  onChange={(event) => updateField(field, event.target.value)}
                  className="rounded-md border border-default-300 bg-background px-3 py-2 font-normal"
                />
              ) : field === "description" ? (
                <textarea
                  value={value || ""}
                  onChange={(event) => updateField(field, event.target.value)}
                  rows={4}
                  className="rounded-md border border-default-300 bg-background px-3 py-2 font-normal"
                />
              ) : (
                <input
                  type="text"
                  value={value ?? ""}
                  onChange={(event) => updateField(field, event.target.value)}
                  className="rounded-md border border-default-300 bg-background px-3 py-2 font-normal"
                />
              )}
            </label>
          ))}
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Replace product image
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="rounded-md border border-default-300 bg-background p-2 text-sm" />
        </label>
        <div className="flex flex-wrap gap-3 border-t border-default-200 pt-4">
          <button type="submit" disabled={saving} className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
            {saving ? "Saving..." : "Save changes"}
          </button>
          <Link href="/admin/products" className="rounded-md border border-default-300 px-4 py-2.5 text-sm font-semibold hover:bg-default-100">Cancel</Link>
        </div>
      </form>
    </div>
  );
}