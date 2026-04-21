"use client";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/cart.store";
import { useAuthStore } from "@/store/auth.store";
import { useT } from "@/hooks/useT";
import { ordersApi, customersApi } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  street: z.string().min(5),
  city: z.string().min(2),
  postal_code: z.string().min(3),
  country: z.string().min(2),
});
type FormData = z.infer<typeof schema>;

function CheckoutForm() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const t = useT();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const currency = items[0]?.currency ?? "USD";

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
  });

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      let customerId = "";
      try {
        const r = await customersApi.create({ email: data.email, name: data.name });
        customerId = r.data.id;
      } catch {
        const list = await customersApi.list();
        const found = list.data.find((c: { email: string; id: string }) => c.email === data.email);
        if (!found) throw new Error("Could not create customer record");
        customerId = found.id;
      }
      await ordersApi.create(customerId);
      const order = (await ordersApi.create(customerId)).data;
      for (const item of items) {
        await ordersApi.addItem(order.id, { sku: item.sku, quantity: item.quantity });
      }
      await ordersApi.confirm(order.id);
      const paid = (await ordersApi.pay(order.id, "mock")).data;
      clearCart();
      router.push(`/account/orders?success=${paid.id}`);
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? t.checkout.error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.replace("/cart");
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-5">
        <h2 className="font-serif text-xl font-semibold text-ink">{t.checkout.shippingInfo}</h2>
        <Input label={t.checkout.fullName} error={errors.name?.message} {...register("name")} />
        <Input label={t.checkout.email} type="email" error={errors.email?.message} {...register("email")} />
        <Input label={t.checkout.streetAddress} error={errors.street?.message} {...register("street")} />
        <div className="grid grid-cols-2 gap-4">
          <Input label={t.checkout.city} error={errors.city?.message} {...register("city")} />
          <Input label={t.checkout.postalCode} error={errors.postal_code?.message} {...register("postal_code")} />
        </div>
        <Input label={t.checkout.country} error={errors.country?.message} {...register("country")} />
        <h2 className="font-serif text-xl font-semibold text-ink pt-4">{t.checkout.payment}</h2>
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {t.checkout.mockPayment}
        </div>
        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      </div>
      <div className="rounded-xl border border-ink/10 bg-white p-6 h-fit space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">{t.checkout.orderSummary}</h2>
        {items.map((item) => (
          <div key={item.sku} className="flex justify-between text-sm">
            <span className="text-ink/70">{item.name} × {item.quantity}</span>
            <span className="font-medium">{formatPrice(item.price * item.quantity, item.currency)}</span>
          </div>
        ))}
        <div className="border-t border-ink/10 pt-4 flex justify-between font-semibold text-ink">
          <span>{t.checkout.total}</span>
          <span>{formatPrice(totalAmount(), currency)}</span>
        </div>
        <Button type="submit" className="w-full" size="lg" loading={loading}>{t.checkout.placeOrder}</Button>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl font-bold text-ink mb-8">{t.checkout.title}</h1>
      <Suspense fallback={<div className="h-96 animate-pulse bg-ink/5 rounded-xl" />}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}
