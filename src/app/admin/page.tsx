"use client";
import { useEffect, useState } from "react";
import { productsApi, categoriesApi, inventoryApi } from "@/lib/api";
import { Card, CardBody } from "@/components/ui/Card";
import { Package, Tag, Archive } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, batches: 0 });

  useEffect(() => {
    Promise.all([
      productsApi.list({ active_only: false }),
      categoriesApi.list(),
      inventoryApi.listBatches(),
    ]).then(([p, c, b]) => {
      setStats({ products: p.data.length, categories: c.data.length, batches: b.data.length });
    });
  }, []);

  const cards = [
    { label: "Products", value: stats.products, icon: Package, color: "text-blue-600 bg-blue-50" },
    { label: "Categories", value: stats.categories, icon: Tag, color: "text-green-600 bg-green-50" },
    { label: "Batches", value: stats.batches, icon: Archive, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardBody className="flex items-center gap-4">
              <div className={`rounded-xl p-3 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">{value}</p>
                <p className="text-sm text-ink/50">{label}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="text-sm text-ink/50">
        Use the sidebar to manage your store.
      </div>
    </div>
  );
}
