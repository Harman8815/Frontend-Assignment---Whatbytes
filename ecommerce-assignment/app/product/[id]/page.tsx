"use client";

import React, { useRef, useState, use } from "react";
import { notFound } from "next/navigation";
import products from "@/data/product.json";
import type { Product } from "@/types/product";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useToastStore } from "@/store/useToastStore";

type PageProps = { params: Promise<{ id: string }> };

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params);
  const product = (products as Product[]).find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [zoomScale, setZoomScale] = useState(1.1);
  const [activeImage, setActiveImage] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const showToast = useToastStore((s) => s.showToast);
  const images = new Array(5).fill(product?.image); // repeat same image 5 times

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 10,
      spacing: 4,
    },
  });

  if (!product) return notFound();

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      setZoomScale(naturalWidth < 800 || naturalHeight < 1200 ? 1.6 : 1.1);
    }
  };

  return (
    <main className="min-h-[100vh-300px] grid grid-cols-1 md:grid-cols-[40%_60%] gap-10 px-6 py-12 bg-[var(--accent)] text-[var(--text)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--grey)] bg-opacity-90 rounded-lg p-4 h-fit "
      >
        <div className="mb-4 flex justify-center max-h-[500px] overflow-hidden">
          <img
            ref={imgRef}
            src={images[0]}
            alt="preload"
            onLoad={handleImageLoad}
            className="hidden  object-contain "
          />

          <div className="aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg">
            <InnerImageZoom
              key={activeImage}
              src={images[activeImage]}
              zoomSrc={images[activeImage]}
              zoomScale={zoomScale}
              zoomType="hover"
              zoomPreload
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider flex gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="keen-slider__slide w-[10px] cursor-pointer"
              onClick={() => setActiveImage(idx)}
            >
              <img
                src={img}
                alt={`thumbnail-${idx}`}
                className={`h-20 w-20 object-cover rounded border transition-all duration-300 ${
                  activeImage === idx
                    ? "border-primary ring-2 ring-primary"
                    : "border-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-5"
      >
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-2xl font-semibold text-primary">₹{product.price}</p>
        <p className="text-gray-600 text-xl">{product.description}</p>
        <p className="text-sm text-gray-500">
          Category: <span className="font-medium">{product.category}</span>
        </p>
        <div className="text-yellow-500 text-lg">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
          <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
        </div>

        <div className="flex border w-fit rounded overflow-hidden">
          <button
            onClick={() => {
              if (qty > 1) {
                const newQty = qty - 1;
                setQty(newQty);
                showToast({
                  type: "info",
                  message: `Quantity decreased to ${newQty}`,
                });
              } else {
                showToast({ type: "error", message: "Minimum quantity is 1" });
              }
            }}
            className="w-8 h-8 bg-primary text-[var(--whitetext)] hover:bg-primary/90"
          >
            –
          </button>
          <span className="w-12 h-8 flex items-center justify-center bg-[var(--accent)]">
            {qty}
          </span>
          <button
            onClick={() => {
              const newQty = qty + 1;
              setQty(newQty);
              showToast({
                type: "info",
                message: `Quantity increased to ${newQty}`,
              });
            }}
            className="w-8 h-8 bg-primary text-[var(--whitetext)] hover:bg-primary/90"
          >
            +
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => {
            showToast({
              type: "success",
              message: `Added ${qty} × ${product.title} to cart`,
            });
          }}
          className="bg-primary text-[var(--whitetext)] px-6 py-2 rounded-md hover:bg-primary/90 transition"
        >
          Add to Cart
        </motion.button>

        <section className="mt-8 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">Reviews</h3>
          <p className="text-gray-500 italic">No reviews yet.</p>
        </section>
      </motion.div>
    </main>
  );
}
