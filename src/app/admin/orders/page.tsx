"use client";
import { useEffect, useState } from "react";
import { customersApi, ordersApi } from "@/lib/api";
import { formatPrice, ORDER_STATUS_COLORS } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Order } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const customers = (await customersApi.list()).data as { id: string }[];
        const all = await Promise.all(
          customers.map((c) => ordersApi.listByCustomer(c.id).then((r) => r.data as Order[]))
        );
        setOrders(all.flat());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const action = async (orderId: string, act: "ship" | "cancel") => {
    if (act === "ship") await ordersApi.ship(orderId);
    else await ordersApi.cancel(orderId);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: act === "ship" ? "shipped" : "cancelled" } : o
      )
    );
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">Orders</h1>
      {loading ? (
        <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 rounded-lg bg-ink/5 animate-pulse" />)}</div>
      ) : orders.length === 0 ? (
        <p className="text-center text-ink/40 py-16">No orders yet.</p>
      ) : (
        <div className="rounded-xl border border-ink/10 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream border-b border-ink/10">
              <tr>
                {["Order ID", "Customer", "Total", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-ink/50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-cream/50">
                  <td className="px-4 py-3 font-mono text-xs text-ink/40">{o.id.slice(0, 8)}…</td>
                  <td className="px-4 py-3 text-ink/60">{o.customer_id.slice(0, 8)}…</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(o.total_amount, o.total_currency)}</td>
                  <td className="px-4 py-3">
                    <Badge className={ORDER_STATUS_COLORS[o.status]}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    {o.status === "paid" && (
                      <Button size="sm" variant="secondary" onClick={() => action(o.id, "ship")}>
                        Ship
                      </Button>
                    )}
                    {["pending", "confirmed", "paid"].includes(o.status) && (
                      <Button size="sm" variant="danger" onClick={() => action(o.id, "cancel")}>
                        Cancel
                      </Button>
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
