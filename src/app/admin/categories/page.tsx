"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categoriesApi } from "@/lib/api";
import { useT } from "@/hooks/useT";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useT();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ name: string; description: string }>();

  const load = () => categoriesApi.list().then((r) => setCategories(r.data));
  useEffect(() => { load(); }, []);

  const onSubmit = async (data: { name: string; description: string }) => {
    setLoading(true);
    setError("");
    try {
      await categoriesApi.create(data);
      reset();
      load();
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? t.admin.failedCreateCategory);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">{t.admin.categories}</h1>
      <Card className="mb-8">
        <CardBody>
          <h2 className="font-medium text-ink mb-4">{t.admin.addCategory}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label={t.admin.name} error={errors.name?.message} {...register("name", { required: "Required" })} />
            <Input label={t.admin.description} {...register("description")} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" loading={loading} size="sm">{t.admin.addCategory}</Button>
          </form>
        </CardBody>
      </Card>
      <div className="rounded-xl border border-ink/10 bg-white overflow-hidden">
        {categories.length === 0 ? (
          <p className="px-6 py-8 text-center text-ink/40 text-sm">{t.admin.noCategories}</p>
        ) : (
          <ul className="divide-y divide-ink/5">
            {categories.map((c) => (
              <li key={c.id} className="px-6 py-4">
                <p className="font-medium text-ink">{c.name}</p>
                {c.description && <p className="text-sm text-ink/50">{c.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
