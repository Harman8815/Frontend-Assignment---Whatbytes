"use client";

import React from "react";
import { X } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";

const typeClass = {
  success: "bg-green-500 text-[var(--whitetext)]",
  error: "bg-red-500 text-[var(--whitetext)]",
  info: "bg-blue-500 text-[var(--whitetext)]",
  warning: "bg-yellow-400 text-[var(--text)]",
};

export const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-5 right-5 space-y-3 z-50">
      {toasts.map(({ id, message, type = "success" }) => (
        <div
          key={id}
          className={`flex items-center justify-between gap-4 w-72 px-4 py-3 rounded-lg shadow-md animate-slideInRight ${typeClass[type]}`}
        >
          <span className="text-sm font-medium">{message}</span>
          <button onClick={() => removeToast(id)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
export default Toast;