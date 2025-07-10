// store/themeStore.ts
import { create } from "zustand";

type ThemeState = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const nextMode = !state.darkMode;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", nextMode);
      }
      return { darkMode: nextMode };
    }),
}));
