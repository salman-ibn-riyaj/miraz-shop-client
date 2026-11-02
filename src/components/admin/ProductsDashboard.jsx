"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";

const categories = [
  ["all", "All categories"],
  ["mens-watch", "Men's watches"],
  ["womens-watch", "Women's watches"],
  ["three-piece", "3-piece dresses"],
  ["cosmetics", "Cosmetics"],
  ["kids-learning", "Kids learning"],
  ["trimmer", "Trimmers"],
  ["wallets", "Wallets"],
  ["bracelets", "Bracelets"],
];

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [refresh, setRefresh] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ category, search, page: String(page), pageSize: String(pageSize) });
    const [sortBy, order] = sort.split(":");
    params.set("sort", sortBy);
    params.set("order", order || "desc");

    fetch(`/api/admin/products?${params}`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Could not load products");
        setProducts(result.data || []);
        setTotal(result.total || 0);
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [category, page, refresh, search, sort]);

  const submitSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setPage(1);
    setSearch(searchInput.trim());
  };

  const changeCategory = (value) => {
    setLoading(true);
    setError("");
    setCategory(value);
    setPage(1);
  };

  const changeSort = (value) => {
    setLoading(true);
    setError("");
    setSort(value);
    setPage(1);
  };

  const changePage = (value) => {
    setLoading(true);
    setError("");
    setPage(value);
  };

  const removeProduct = async (product) => {
    if (!window.confirm(`Permanently delete "${product.title}"?`)) return;
    setNotice("");
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/products/${product.category}/${product._id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not delete product");
      setNotice("Product deleted.");
      setRefresh((value) => value + 1);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section aria-label="Product inventory">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="product-category">Category</label>
        <select
          id="product-category"
          value={category}
          onChange={(event) => changeCategory(event.target.value)}
          className="min-h-10 rounded-md border border-default-300 bg-background px-3 text-sm"
        >
          {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>

        <form onSubmit={submitSearch} className="flex min-w-56 flex-1 gap-2 sm:max-w-md">
          <label className="sr-only" htmlFor="product-search">Search products</label>
          <input
            id="product-search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search title, brand, or description"
            className="min-h-10 min-w-0 flex-1 rounded-md border border-default-300 bg-background px-3 text-sm"
          />
          <button type="submit" aria-label="Search" title="Search" className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-default-300 hover:bg-default-100">
            <FiSearch aria-hidden="true" />
          </button>
        </form>

        <label className="sr-only" htmlFor="product-sort">Sort products</label>
        <select
          id="product-sort"
          value={sort}
          onChange={(event) => changeSort(event.target.value)}
          className="min-h-10 rounded-md border border-default-300 bg-background px-3 text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="title:asc">Title A to Z</option>
          <option value="title:desc">Title Z to A</option>
          <option value="price:asc">Price low to high</option>
          <option value="price:desc">Price high to low</option>
        </select>
      </div>

      <div className="mb-3 flex min-h-6 items-center justify-between text-sm text-default-500">
        <span>{total} product{total === 1 ? "" : "s"}</span>
        <span aria-live="polite">{notice}</span>
      </div>

      {error && <p role="alert" className="mb-4 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{error}</p>}

      <div className="overflow-x-auto border-y border-default-200">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-default-100 text-xs uppercase text-default-500">
            <tr>
              <th className="px-3 py-3 font-semibold">Product</th>
              <th className="px-3 py-3 font-semibold">API category</th>
              <th className="px-3 py-3 font-semibold">Price</th>
              <th className="px-3 py-3 font-semibold">Added</th>
              <th className="px-3 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default-200">
            {loading ? (
              <tr><td colSpan="5" className="px-3 py-12 text-center text-default-500">Loading products...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="5" className="px-3 py-12 text-center text-default-500">No products found.</td></tr>
            ) : products.map((product) => (
              <tr key={`${product.category}-${product._id}`} className="hover:bg-default-50">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt="" width={48} height={48} unoptimized className="h-12 w-12 rounded object-cover" />
                    ) : <div className="h-12 w-12 rounded bg-default-100" />}
                    <div className="min-w-0">
                      <p className="max-w-[360px] truncate font-semibold text-foreground">{product.title || "Untitled product"}</p>
                      <p className="max-w-[360px] truncate text-xs text-default-500">{product.brand || product.description || "No extra details"}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-default-600">{product.categoryLabel}</td>
                <td className="whitespace-nowrap px-3 py-3">৳{Number(product.price || 0).toLocaleString("en-BD")}</td>
                <td className="whitespace-nowrap px-3 py-3 text-default-500">
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "—"}
                </td>
                <td className="px-3 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.category}/${product._id}/edit`}
                      aria-label={`Edit ${product.title}`}
                      title="Edit product"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-default-300 hover:bg-default-100"
                    ><FiEdit2 aria-hidden="true" /></Link>
                    <button
                      type="button"
                      onClick={() => removeProduct(product)}
                      aria-label={`Delete ${product.title}`}
                      title="Delete product"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-danger/40 text-danger hover:bg-danger/5"
                    ><FiTrash2 aria-hidden="true" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className="text-default-500">Page {page} of {pageCount}</span>
        <div className="flex gap-2">
          <button type="button" disabled={page <= 1 || loading} onClick={() => changePage(page - 1)} className="rounded-md border border-default-300 px-3 py-2 disabled:opacity-40">Previous</button>
          <button type="button" disabled={page >= pageCount || loading} onClick={() => changePage(page + 1)} className="rounded-md border border-default-300 px-3 py-2 disabled:opacity-40">Next</button>
        </div>
      </div>
    </section>
  );
}