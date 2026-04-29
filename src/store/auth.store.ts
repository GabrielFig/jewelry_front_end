"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const COOKIE_OPTS: Cookies.CookieAttributes = {
  expires: 1,
  sameSite: "strict",
  // CN-003: enforce HTTPS-only transmission in production
  secure: process.env.NODE_ENV === "production",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        Cookies.set("access_token", token, COOKIE_OPTS);
        // CN-001: user_role cookie removed — role now comes from JWT payload in middleware
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        Cookies.remove("access_token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      skipHydration: true,
      // CN-002: exclude raw JWT from localStorage — cookie is the authoritative source
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
