"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, User, LogOut, LayoutDashboard, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import { useAuthStore } from "@/store/auth.store";
import { useLanguageStore } from "@/store/language.store";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const { lang, toggle } = useLanguageStore();
  const t = useT();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          transparent
            ? "bg-transparent border-b border-white/10"
            : "bg-white/95 backdrop-blur-sm border-b border-ink/8 shadow-sm"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="cursor-pointer flex items-center">
            <div
              className={cn(
                "rounded-md transition-all duration-300",
                transparent ? "bg-white/15 px-2 py-1" : ""
              )}
            >
              <Image
                src="/images/logo.png"
                alt="Caritz - Joyería de Diseño"
                width={120}
                height={60}
                priority
                className="object-contain h-10 w-auto"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/products", label: t.nav.collections },
              { href: "/products?category_id=", label: t.nav.newArrivals },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm transition-colors duration-200 relative group cursor-pointer",
                  transparent
                    ? "text-white/80 hover:text-white"
                    : "text-ink/70 hover:text-burgundy"
                )}
              >
                {label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300",
                    transparent ? "bg-gold-light" : "bg-burgundy"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className={cn(
                "text-[10px] font-bold tracking-widest border rounded px-2 py-1 transition-all duration-200 cursor-pointer",
                transparent
                  ? "border-white/25 text-white/60 hover:text-white hover:border-white/50"
                  : "border-ink/15 text-ink/50 hover:text-sage hover:border-sage/40"
              )}
              aria-label="Switch language"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className={cn(
                "relative transition-colors duration-200 cursor-pointer",
                transparent ? "text-white/70 hover:text-white" : "text-ink/70 hover:text-burgundy"
              )}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-burgundy text-white text-[10px] flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User menu — desktop */}
            <div className="hidden md:block">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className={cn(
                      "flex items-center gap-1 text-sm transition-colors duration-200 cursor-pointer",
                      transparent ? "text-white/70 hover:text-white" : "text-ink/70 hover:text-burgundy"
                    )}
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl border border-ink/8 bg-white shadow-xl py-1.5 overflow-hidden">
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-cream-dark/60 transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-sage" />
                        {t.nav.myAccount}
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-cream-dark/60 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-sage" />
                        {t.nav.myOrders}
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gold font-medium hover:bg-cream-dark/60 transition-colors cursor-pointer"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          {t.nav.adminPanel}
                        </Link>
                      )}
                      <hr className="my-1 border-ink/8" />
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        {t.nav.signOut}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 cursor-pointer",
                    transparent ? "text-white/80 hover:text-white" : "text-ink hover:text-sage"
                  )}
                >
                  {t.nav.signIn}
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className={cn(
                "md:hidden transition-colors duration-200 cursor-pointer",
                transparent ? "text-white/80" : "text-ink/70"
              )}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 bg-white shadow-xl border-t border-ink/8 py-4 px-6 flex flex-col gap-1">
            <Link
              href="/products"
              className="py-3 text-ink font-medium border-b border-ink/5 hover:text-burgundy transition-colors cursor-pointer"
            >
              {t.nav.collections}
            </Link>
            <Link
              href="/products?category_id="
              className="py-3 text-ink font-medium border-b border-ink/5 hover:text-burgundy transition-colors cursor-pointer"
            >
              {t.nav.newArrivals}
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  href="/account"
                  className="py-3 text-ink font-medium border-b border-ink/5 hover:text-burgundy transition-colors cursor-pointer"
                >
                  {t.nav.myAccount}
                </Link>
                <Link
                  href="/account/orders"
                  className="py-3 text-ink font-medium border-b border-ink/5 hover:text-burgundy transition-colors cursor-pointer"
                >
                  {t.nav.myOrders}
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="py-3 text-gold font-semibold border-b border-ink/5 cursor-pointer"
                  >
                    {t.nav.adminPanel}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="py-3 text-red-500 font-medium text-left cursor-pointer"
                >
                  {t.nav.signOut}
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="py-3 text-ink font-medium hover:text-burgundy transition-colors cursor-pointer"
              >
                {t.nav.signIn}
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
