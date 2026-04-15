"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { productsApi } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    productsApi.list({ active_only: false }).then((r) => setProducts(r.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const deactivate = async (sku: string) => {
    await productsApi.deactivate(sku);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink">Products</h1>
        <Link href="/admin/products/new">
          <Button size="sm"><Plus className="w-4 h-4" /> New Product</Button>
        </Link>
      </div>
      {loading ? (
        <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 rounded-lg bg-ink/5 animate-pulse" />)}</div>
      ) : (
        <div className="rounded-xl border border-ink/10 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream border-b border-ink/10">
              <tr>
                {["SKU", "Name", "Price", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-ink/50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {products.map((p) => (
                <tr key={p.sku} className="hover:bg-cream/50">
                  <td className="px-4 py-3 font-mono text-xs text-ink/50">{p.sku}</td>
                  <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-4 py-3">{formatPrice(p.price_amount, p.price_currency)}</td>
                  <td className="px-4 py-3">
                    <Badge className={p.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                      {p.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {p.is_active && (
                      <button onClick={() => deactivate(p.sku)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
