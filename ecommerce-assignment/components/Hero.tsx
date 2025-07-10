"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ProductCard from "./ProductCard";
import products from "@/data/product.json";
import type { Product } from "@/types/product";

const productList: Product[] = products;

const Hero = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allCategories = ["All", "Electronics", "Clothing", "Books", "Shoes"];
  const allBrands = ["Sony", "Nike", "Samsung"];

  const selectedCategories = searchParams.getAll("category");
  const selectedBrands = searchParams.getAll("brand");
  const priceDropdown = searchParams.get("dropdown") || "";
  const priceRangeParam = searchParams.get("price") || "0-100000";
  const [minPrice, maxPrice] = priceRangeParam.split("-").map(Number);

  const updateParam = (key: string, value: string, multi = true) => {
    const current = new URLSearchParams(searchParams.toString());

    if (multi) {
      const existing = current.getAll(key);
      if (existing.includes(value)) {
        current.delete(key);
        existing
          .filter((v) => v !== value)
          .forEach((v) => current.append(key, v));
      } else {
        current.append(key, value);
      }
    } else {
      current.set(key, value);
    }

    router.push(`?${current.toString()}`);
  };

  const filteredProducts = productList
    .filter((p) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes("All") ||
        selectedCategories.includes(p.category);

      const matchBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(p.title.split(" ")[0]);

      const matchSlider = p.price >= minPrice && p.price <= maxPrice;

      const matchDropdown = (() => {
        if (!priceDropdown) return true;
        if (priceDropdown === "5000+") return p.price >= 5000;
        const [min, max] = priceDropdown.split("-").map(Number);
        return p.price >= min && p.price <= max;
      })();

      return matchCategory && matchBrand && matchSlider && matchDropdown;
    })
    .slice(0, 9);

  return (
    <main className="min-h-screen text-[var(--whitetext)] px-18 py-12 grid grid-cols-1 lg:grid-cols-4 gap-1 bg-[var(--surface)]">
      <aside className="lg:col-span-1 p-4 space-y-10 max-w-[350px]">
        <div className="bg-primary rounded-lg p-4 px-6 text-[var(--whitetext)]">
          <h3 className="font-semibold mb-4 text-2xl">Filters</h3>

          <h4 className="font-semibold mb-2 text-lg">Category</h4>
          <div className="space-y-3">
            {allCategories.map((cat) => (
              <label
                key={cat}
                className="flex items-center space-x-3 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => updateParam("category", cat, true)}
                  className="round-checkbox"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <h4 className="font-semibold mt-6 mb-2 text-lg">Price (Slider)</h4>
          <div className="px-2">
            <Slider
              range
              min={0}
              max={100000}
              value={[minPrice, maxPrice]}
              allowCross={false}
              onChange={(val) => {
                const [min, max] = val as [number, number];
                updateParam("price", `${min}-${max}`, false);
              }}
              trackStyle={[{ backgroundColor: "#fff", height: 4 }]}
              handleStyle={[
                { backgroundColor: "#fff", borderColor: "#fff" },
                { backgroundColor: "#fff", borderColor: "#fff" },
              ]}
              railStyle={{ backgroundColor: "white", height: 4 }}
            />
            <div className="flex justify-between text-sm text-[var(--whitetext)] mt-2">
              <span>₹{minPrice}</span>
              <span>₹{maxPrice}</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--accent)] rounded-lg p-4 text-[var(--text)]">
          <h4 className="font-semibold mb-2 text-lg">Brand</h4>
          <div className="space-y-2">
            {allBrands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => updateParam("brand", brand, true)}
                  className="accent-primary round-checkbox"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>

          <h4 className="font-semibold mb-2 mt-6 text-lg">Price (Dropdown)</h4>
          <select
            value={priceDropdown}
            onChange={(e) => updateParam("dropdown", e.target.value, false)}
            className="w-full h-9 px-2 text-sm bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Price</option>
            <option value="0-499">₹0 - ₹499</option>
            <option value="500-999">₹500 - ₹999</option>
            <option value="1000-1999">₹1000 - ₹1999</option>
            <option value="2000-4999">₹2000 - ₹4999</option>
            <option value="5000+">₹5000+</option>
          </select>
        </div>
      </aside>

      <section className="lg:col-span-3 text-[var(--text)] px-4 py-6 w-full">
        <h2 className="text-3xl font-bold mb-6">Product Listing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Hero;
