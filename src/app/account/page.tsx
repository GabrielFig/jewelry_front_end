"use client";
import { useAuthStore } from "@/store/auth.store";
import { useT } from "@/hooks/useT";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function AccountPage() {
  const { user } = useAuthStore();
  const t = useT();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl font-bold text-ink mb-8">{t.account.title}</h1>
      <Card>
        <CardHeader>
          <h2 className="font-medium text-ink">{t.account.profile}</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-ink/50">{t.account.name}</span>
            <span className="font-medium text-ink">{user.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink/50">{t.account.email}</span>
            <span className="font-medium text-ink">{user.email}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-ink/50">{t.account.role}</span>
            <Badge className={user.role === "admin" ? "bg-gold/10 text-gold" : "bg-blue-100 text-blue-800"}>
              {user.role}
            </Badge>
          </div>
        </CardBody>
      </Card>
      <div className="mt-4 flex gap-3">
        <Link href="/account/orders" className="text-sm text-gold hover:underline">
          {t.account.viewOrders}
        </Link>
        {user.role === "admin" && (
          <Link href="/admin" className="text-sm text-gold hover:underline">
            {t.account.adminPanel}
          </Link>
        )}
      </div>
    </div>
  );
}
