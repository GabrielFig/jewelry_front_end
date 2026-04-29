"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ordersApi } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { useT } from "@/hooks/useT";
import { formatPrice, ORDER_STATUS_COLORS } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { Order } from "@/types";

function OrdersContent() {
  const { user } = useAuthStore();
  const params = useSearchParams();
  // CN-014: validate UUID format before rendering to prevent arbitrary string injection
  const rawSuccess = params.get("success");
  const successId = rawSuccess && /^[0-9a-f-]{36}$/i.test(rawSuccess) ? rawSuccess : null;
  const t = useT();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    ordersApi
      .listByCustomer(user.id)
      .then((r) => setOrders(r.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl font-bold text-ink mb-8">{t.orders.title}</h1>

      {successId && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-green-700 text-sm">
          {t.orders.successPrefix} <strong>{successId}</strong>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-ink/5 animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-ink/50 py-16">{t.orders.noOrders}</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink/40">{order.id}</span>
                  <Badge className={ORDER_STATUS_COLORS[order.status]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.sku} className="flex justify-between text-sm">
                      <span className="text-ink/70">{item.sku} × {item.quantity}</span>
                      <span>{formatPrice(item.subtotal, item.unit_price_currency)}</span>
                    </div>
                  ))}
                  <div className="border-t border-ink/10 pt-2 flex justify-between font-semibold">
                    <span>{t.orders.total}</span>
                    <span>{formatPrice(order.total_amount, order.total_currency)}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const t = useT();
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-12 text-ink/40">{t.orders.loading}</div>}>
      <OrdersContent />
    </Suspense>
  );
}
