"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { useLanguageStore } from "@/store/language.store";
import { useT } from "@/hooks/useT";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { AuthResponse } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const lang = useLanguageStore((s) => s.lang);
  const t = useT();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const schema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(2, t.auth.nameTooShort),
          email: z.string().email(t.auth.validEmail),
          password: z.string().min(8, t.auth.passwordTooShort),
          confirm: z.string(),
        })
        .refine((d) => d.password === d.confirm, {
          message: t.auth.passwordsMismatch,
          path: ["confirm"],
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );
  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const r = await authApi.register({ name: data.name, email: data.email, password: data.password });
      const { access_token, user } = r.data as AuthResponse;
      login(user, access_token);
      router.push("/");
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? t.auth.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-ink">{t.auth.createAccount}</h1>
          <p className="text-ink/50 mt-2 text-sm">{t.auth.joinSubtitle}</p>
        </div>
        <div className="bg-white rounded-2xl border border-ink/10 shadow-sm p-8">
          <form key={lang} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input label={t.auth.fullName} error={errors.name?.message} {...register("name")} />
            <Input label={t.auth.email} type="email" error={errors.email?.message} {...register("email")} />
            <Input label={t.auth.password} type="password" error={errors.password?.message} {...register("password")} />
            <Input label={t.auth.confirmPassword} type="password" error={errors.confirm?.message} {...register("confirm")} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              {t.auth.createAccount}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-ink/50">
            {t.auth.alreadyAccount}{" "}
            <Link href="/auth/login" className="text-gold hover:underline font-medium">
              {t.auth.signInLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
