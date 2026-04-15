import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="font-serif text-xl font-bold tracking-widest text-ink">LUMIÈRE</span>
          <p className="mt-2 text-sm text-ink/60 max-w-xs">
            Exquisite jewelry crafted for life&apos;s most meaningful moments.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">Shop</h4>
          <ul className="mt-3 space-y-2">
            <li><Link href="/products" className="text-sm text-ink/60 hover:text-gold">All Collections</Link></li>
            <li><Link href="/cart" className="text-sm text-ink/60 hover:text-gold">Shopping Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">Account</h4>
          <ul className="mt-3 space-y-2">
            <li><Link href="/auth/login" className="text-sm text-ink/60 hover:text-gold">Sign In</Link></li>
            <li><Link href="/auth/register" className="text-sm text-ink/60 hover:text-gold">Create Account</Link></li>
            <li><Link href="/account/orders" className="text-sm text-ink/60 hover:text-gold">My Orders</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10 py-4 text-center text-xs text-ink/40">
        © {new Date().getFullYear()} LUMIÈRE. All rights reserved.
      </div>
    </footer>
  );
}
