"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productsApi, categoriesApi } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Category } from "@/types";

const schema = z.object({
  sku: z.string().min(3),
  name: z.string().min(2),
  description: z.string().optional(),
  price_amount: z.coerce.number().positive(),
  price_currency: z.string().default("USD"),
  category_id: z.string().min(1, "Select a category"),
  attributes: z.string().optional(),
  image_url: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { categoriesApi.list().then((r) => setCategories(r.data)); }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    let attributes = {};
    if (data.attributes) {
      try { attributes = JSON.parse(data.attributes); } catch { setError("Attributes must be valid JSON"); setLoading(false); return; }
    }
    try {
      await productsApi.create({ ...data, attributes, description: data.description ?? "", image_url: data.image_url ?? "" });
      router.push("/admin/products");
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? "Failed to create product.");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input label="SKU" placeholder="RING-GOLD-001" error={errors.sku?.message} {...register("sku")} />
          <Input label="Price" type="number" step="0.01" error={errors.price_amount?.message} {...register("price_amount")} />
        </div>
        <Input label="Name" error={errors.name?.message} {...register("name")} />
        <div>
          <label className="text-sm font-medium text-ink/80">Description</label>
          <textarea className="mt-1 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold h-24 resize-none" {...register("description")} />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80">Category</label>
          <select className="mt-1 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-gold" {...register("category_id")}>
            <option value="">— select —</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {errors.category_id && <span className="text-xs text-red-500">{errors.category_id.message}</span>}
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80">Attributes (JSON)</label>
          <textarea className="mt-1 w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold h-24 resize-none" placeholder='{"material": "18k gold", "gemstone": "diamond"}' {...register("attributes")} />
        </div>
        <Input label="Image URL (optional)" {...register("image_url")} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={loading}>Create Product</Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
