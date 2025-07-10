"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { useCart } from "@/store/cart";
import { useToastStore } from "@/store/useToastStore";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCart((s) => s.addToCart);
  const showToast = useToastStore((s) => s.showToast);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col bg-[var(--accent)] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 text-[var(--text)] w-full h-full"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={`object-cover rounded-lg transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      </Link>

      <p className="text-[var(--text)] font-bold mb-2">₹{product.price}</p>

      <div className="flex-grow" />

      <motion.button
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.03 }}
        onClick={(e) => {
          e.stopPropagation();
          addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          });
          showToast({ message: `"${product.title}" added to cart!`, type: "success" });
        }}
        className="bg-primary text-[var(--whitetext)] py-2 rounded-md hover:bg-primary/90 transition"
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
