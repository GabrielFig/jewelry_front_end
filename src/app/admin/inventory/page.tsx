"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { inventoryApi } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { BatchModel } from "@/types";

export default function AdminInventoryPage() {
  const [batches, setBatches] = useState<BatchModel[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{
    reference: string; sku: string; quantity: number; eta?: string;
  }>();
  const { register: rA, handleSubmit: hA, reset: resetA, formState: { errors: eA } } = useForm<{
    order_id: string; sku: string; quantity: number;
  }>();

  const load = () => inventoryApi.listBatches().then((r) => setBatches(r.data));
  useEffect(() => { load(); }, []);

  const onAddBatch = async (data: { reference: string; sku: string; quantity: number; eta?: string }) => {
    setLoading(true); setError("");
    try {
      await inventoryApi.addBatch({ ...data, quantity: Number(data.quantity) });
      reset(); load();
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? "Failed");
    } finally { setLoading(false); }
  };

  const onAllocate = async (data: { order_id: string; sku: string; quantity: number }) => {
    setLoading(true); setError("");
    try {
      await inventoryApi.allocate({ ...data, quantity: Number(data.quantity) });
      resetA(); load();
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? "Failed");
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardBody>
            <h2 className="font-medium text-ink mb-4">Add Batch</h2>
            <form onSubmit={handleSubmit(onAddBatch)} className="space-y-3">
              <Input label="Reference" error={errors.reference?.message} {...register("reference", { required: true })} />
              <Input label="SKU" error={errors.sku?.message} {...register("sku", { required: true })} />
              <Input label="Quantity" type="number" error={errors.quantity?.message} {...register("quantity", { required: true })} />
              <Input label="ETA (optional)" type="date" {...register("eta")} />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <Button type="submit" loading={loading} size="sm">Add Batch</Button>
            </form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2 className="font-medium text-ink mb-4">Allocate Stock</h2>
            <form onSubmit={hA(onAllocate)} className="space-y-3">
              <Input label="Order ID" error={eA.order_id?.message} {...rA("order_id", { required: true })} />
              <Input label="SKU" error={eA.sku?.message} {...rA("sku", { required: true })} />
              <Input label="Quantity" type="number" error={eA.quantity?.message} {...rA("quantity", { required: true })} />
              <Button type="submit" loading={loading} size="sm">Allocate</Button>
            </form>
          </CardBody>
        </Card>
      </div>

      <div className="rounded-xl border border-ink/10 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream border-b border-ink/10">
            <tr>
              {["Reference", "SKU", "Purchased", "Available", "ETA"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-ink/50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {batches.map((b) => (
              <tr key={b.reference} className="hover:bg-cream/50">
                <td className="px-4 py-3 font-mono text-xs">{b.reference}</td>
                <td className="px-4 py-3">{b.sku}</td>
                <td className="px-4 py-3">{b.purchased_quantity}</td>
                <td className="px-4 py-3">
                  <Badge className={b.available_quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                    {b.available_quantity}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-ink/50">{b.eta ?? "In stock"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
