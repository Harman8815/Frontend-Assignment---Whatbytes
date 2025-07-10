"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";

import { useCart } from "@/store/cart";
import { useThemeStore } from "@/store/themeStore";
import CartModal from "./CartModal";
import products from "@/data/product.json";
import type { Product } from "@/types/product";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const cartCount = useCart((state) => state.cart.length);
  const { darkMode, toggleDarkMode } = useThemeStore();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(0);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && suggestions[selectedIndex]) {
      handleSelect(suggestions[selectedIndex].id);
    }
  };

  const handleSelect = (id: string) => {
    setSearchTerm("");
    setSuggestions([]);
    setSelectedIndex(0);
    router.push(`/product/${id}`);
  };

  return (
    <>
      <header className="text-[var(--whitetext)] w-full bg-primary shadow px-6 py-4 flex items-center justify-between">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="text-3xl font-bold text-[var(--whitetext)] cursor-pointer"
          onClick={() => router.push("/")}
        >
          Whatbytes
        </motion.div>

        <div className="relative flex-1 mx-6 max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary/50 text-[var(--whitetext)] bg-primary placeholder:text-gray-300"
          />

          <AnimatePresence>
            {searchTerm && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow text-black max-h-60 overflow-y-auto"
              >
                {suggestions.map((item, index) => (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`px-4 py-2 cursor-pointer ${
                      index === selectedIndex
                        ? "bg-primary/10 font-semibold"
                        : ""
                    } hover:bg-primary/10`}
                  >
                    {item.title}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-4 text-[var(--whitetext)]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="relative flex items-center rounded-xl px-4 py-2 space-x-2 bg-[var(--primaryButton)] hover:bg-[var(--input-bg)] hover:text-[var(--text)] hover:ring-2 hover:ring-[var(--text)] transition-all duration-200 cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6  transition-colors duration-200" />
            <h6 className=" text-lg transition-colors duration-200">
              Cart
            </h6>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-[var(--text)] text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primaryButton)] hover:bg-[var(--input-bg)] hover:text-[var(--text)] hover:ring-2 hover:ring-[var(--primary)] transition-all duration-200 cursor-pointer"
          >
            <User className="w-5 h-5  transition-colors duration-200" />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primaryButton)] hover:bg-[var(--input-bg)] hover:ring-2 hover:ring-[var(--primary)] transition"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <span className="text-yellow-300 text-lg">☀</span>
            ) : (
              <span className="text-[var(--whitetext)] text-lg">🌙</span>
            )}
          </motion.button>
        </div>
      </header>

      {isModalOpen && <CartModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Navbar;
