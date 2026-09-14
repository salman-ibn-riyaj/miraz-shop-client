"use client";

import { useState } from "react";
import MensWatchForm from "./MensWatchForm";
import WomensWatchForm from "./WomensWatchForm";
import ThreePieceForm from "./ThreePieceForm";
import CosmeticsForm from "./CosmeticsForm";

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState("mens-watch");

  return (
    <>
      <div className="mb-6 bg-content1 p-4 rounded-xl border border-default-200">
        <label className="block text-sm font-semibold mb-2 text-foreground">
          Select Product Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border border-default-300 rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="mens-watch">Men's Watch</option>
          <option value="womens-watch">Women's Watch</option>
          <option value="three-piece">3-Piece Dress</option>
          <option value="cosmetics">Cosmetics & Beauty</option>
        </select>
      </div>

      <div className="bg-content1 p-6 rounded-2xl border border-default-200 shadow-sm">
        {selectedCategory === "mens-watch" && <MensWatchForm />}
        {selectedCategory === "womens-watch" && <WomensWatchForm />}
        {selectedCategory === "three-piece" && <ThreePieceForm />}
        {selectedCategory === "cosmetics" && <CosmeticsForm />}
      </div>
    </>
  );
}