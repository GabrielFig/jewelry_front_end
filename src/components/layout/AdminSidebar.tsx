"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tag, ShoppingBag, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/useT";

export function AdminSidebar() {
  const pathname = usePathname();
  const t = useT();

  const links = [
    { href: "/admin", label: t.admin.dashboard, icon: LayoutDashboard, exact: true },
    { href: "/admin/products", label: t.admin.products, icon: Package },
    { href: "/admin/categories", label: t.admin.categories, icon: Tag },
    { href: "/admin/orders", label: t.admin.orders, icon: ShoppingBag },
    { href: "/admin/inventory", label: t.admin.inventory, icon: Archive },
  ];

  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <nav className="sticky top-20 space-y-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-gold/10 text-gold" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
