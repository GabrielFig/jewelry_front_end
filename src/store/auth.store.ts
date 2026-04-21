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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        Cookies.set("access_token", token, { expires: 1, sameSite: "strict" });
        Cookies.set("user_role", user.role, { expires: 1, sameSite: "strict" });
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        Cookies.remove("access_token");
        Cookies.remove("user_role");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "auth-storage", skipHydration: true }
  )
);
