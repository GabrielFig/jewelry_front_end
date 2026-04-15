"use client";
import Link from "next/link";
import { ShoppingBag, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart.store";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ink/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-ink">
          LUMIÈRE
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm text-ink/70 hover:text-gold transition-colors">
            Collections
          </Link>
          <Link href="/products?category_id=" className="text-sm text-ink/70 hover:text-gold transition-colors">
            New Arrivals
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/cart" className="relative text-ink/70 hover:text-gold transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-white text-[10px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User menu */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-1 text-sm text-ink/70 hover:text-gold transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-ink/10 bg-white shadow-lg py-1">
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-cream"
                  >
                    <User className="w-4 h-4" /> My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-cream"
                  >
                    <ShoppingBag className="w-4 h-4" /> My Orders
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gold font-medium hover:bg-cream"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Admin Panel
                    </Link>
                  )}
                  <hr className="my-1 border-ink/10" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium text-ink hover:text-gold transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
