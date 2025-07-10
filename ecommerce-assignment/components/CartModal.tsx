"use client";

import React from "react";
import { useCart } from "@/store/cart";
import { useToastStore } from "@/store/useToastStore";
import {
  X,
  Minus,
  Plus,
  Trash2,
  IndianRupee,
  MapPin,
  CreditCard,
  BadgePercent,
  Truck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const showToast = useToastStore((s) => s.showToast);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-20 px-4"
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-[var(--surface)] w-full max-w-6xl rounded-lg p-6 relative grid grid-cols-1 md:grid-cols-[68%_30%] gap-6 overflow-hidden text-[var(--text)]"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-[var(--border)] hover:bg-red-600 text-[var(--text)] hover:text-[var(--whitetext)] rounded-full p-2 transition"
          >
            <X size={18} />
          </button>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text)]">Your Cart</h2>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-6 bg-[var(--surface)] rounded-md shadow-inner">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                  alt="Empty cart"
                  className="w-32 h-32 mb-4 opacity-80"
                />
                <h3 className="text-xl font-semibold mb-2 text-[var(--text)]">Your cart is empty</h3>
                <p className="opacity-70 mb-4 italic">
                  “Looks like you haven’t added anything yet. Let’s fix that.”
                </p>
                <Link
                  href="/"
                  onClick={onClose}
                  className="inline-block bg-primary text-[var(--whitetext)] px-4 py-2 rounded hover:bg-primary/90 transition"
                >
                  Head back to shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="hidden md:grid grid-cols-[70px_1fr_100px_170px_80px_40px] text-sm font-semibold text-[var(--text)] mb-5">
                  <div></div>
                  <div>Title</div>
                  <div>Base Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                  <div></div>
                </div>

                <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="grid grid-cols-[60px_1fr_100px_120px_80px_40px] items-center gap-2 pb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-md border border-[var(--border)]"
                      />
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-sm text-[var(--text)]">₹{item.price}</div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1);
                              showToast({ message: "Quantity decreased", type: "info" });
                            } else {
                              showToast({ message: "Minimum quantity is 1", type: "error" });
                            }
                          }}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center bg-[var(--border)] text-[var(--text)] rounded hover:bg-[var(--accent)] hover:text-[var(--whitetext)] disabled:opacity-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity + 1);
                            showToast({ message: "Quantity increased", type: "info" });
                          }}
                          className="w-7 h-7 flex items-center justify-center bg-[var(--border)] text-[var(--text)] rounded hover:bg-[var(--accent)] hover:text-[var(--whitetext)]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-sm font-semibold text-right text-green-400">
                        ₹{item.price * item.quantity}
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          showToast({ message: `${item.title} removed`, type: "error" });
                        }}
                        className="text-[var(--text)] hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 border-t border-[var(--border)] pt-4 flex justify-between items-center">
                  <button
                    onClick={() => {
                      clearCart();
                      showToast({ message: "Cart cleared", type: "success" });
                    }}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Clear Cart
                  </button>
                  <span className="text-lg font-bold flex items-center gap-1 text-green-400">
                    <IndianRupee size={16} />
                    {total}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="bg-[var(--primary)]/20 p-4 rounded-lg space-y-4 border border-[var(--border)]">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Address
              </h3>
              <p className="text-sm text-[var(--text)]">123 Main St, Bangalore, KA</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-1">
                <BadgePercent className="w-4 h-4" />
                Apply Coupon
              </label>
              <input
                type="text"
                placeholder="Enter code"
                className="w-full border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div className="flex justify-between items-center text-sm font-medium pt-2">
              <span>Total</span>
              <span className="text-green-400 font-bold">₹{total}</span>
            </div>

            <div className="grid gap-2 mt-4">
              <button className="w-full bg-[var(--primary)] text-[var(--whitetext)] py-2 rounded hover:bg-[var(--primary)]/90 flex items-center justify-center gap-2 transition">
                <CreditCard className="w-5 h-5" />
                Pay with Card
              </button>
              <button className="w-full bg-[var(--accent)] text-[var(--text)] py-2 rounded hover:bg-[var(--accent)]/90 transition">
                Pay via UPI
              </button>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary text-[var(--whitetext)] py-2 rounded text-center hover:bg-primary/90 transition"
              onClick={onClose}
            >
              Proceed to Checkout
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;
