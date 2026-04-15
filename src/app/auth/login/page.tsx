"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { AuthResponse } from "@/types";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof schema>;

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const r = await authApi.login(data);
      const { access_token, user } = r.data as AuthResponse;
      login(user, access_token);
      router.push(params.get("next") ?? (user.role === "admin" ? "/admin" : "/"));
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
      <Input label="Password" type="password" error={errors.password?.message} {...register("password")} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full" size="lg" loading={loading}>Sign In</Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-ink">Welcome back</h1>
          <p className="text-ink/50 mt-2 text-sm">Sign in to your LUMIÈRE account</p>
        </div>
        <div className="bg-white rounded-2xl border border-ink/10 shadow-sm p-8">
          <Suspense fallback={<div className="h-48 animate-pulse bg-ink/5 rounded" />}>
            <LoginForm />
          </Suspense>
          <p className="mt-6 text-center text-sm text-ink/50">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-gold hover:underline font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
