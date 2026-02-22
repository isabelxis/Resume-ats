"use client";

import { useState } from "react";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
          email?: string;
          password?: string;
          global?: string;
        }>({});

    async function handleRegister() {
    setErrors({});
    try {
        setLoading(true);
        const res = await api.post("/auth/register", {
            email,
            password
        });

        const accessToken = res.data?.accessToken ?? res.data?.token;
        const rawUser = res.data?.user ?? res.data?.profile ?? res.data;

        if (accessToken && rawUser?.id && rawUser?.email && rawUser?.plan) {
          useAuthStore.getState().setAuth(
            {
              id: rawUser.id,
              email: rawUser.email,
              plan: rawUser.plan,
            },
            accessToken
          );

          await useAuthStore.getState().loadProfile();
        } else {
          await useAuthStore.getState().checkAuth();
        }

        router.push("/dashboard");

    } catch (err: any) {

        const backendErrors = err.response?.data?.errors;
        const message = err.response?.data?.message;

        if (backendErrors) {
          // validações de campo (400)
          setErrors(backendErrors);
        } else if (message) {
          // erro de negócio (401 / 404)
          setErrors({ global: message });
        } else {
          // erro genérico
          setErrors({ global: "Erro ao fazer login" });
        }

    } finally {
        setLoading(false);
    }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 border rounded">
                <h1 className="text-3xl font-bold mb-6">Criar Conta</h1>

                <p className="text-primary mb-4">
                    Crie uma conta para começar a criar currículos otimizados para ATS.
                </p>

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.email}
                    </p>
                )}

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.password}
                    </p>
                )}

                {errors.global && (
                    <div className="mb-4 text-red-500">
                        {errors.global}
                    </div>
                )}

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-secondary text-primary py-2 rounded">
                        {loading ? "Criando..." : "Criar Conta"}
                    </button>

                    <p className="text-sm text-primary mt-6 text-center">
                        Já tem uma conta?{" "}
                        <a href="/login" className="text-blue-500">
                            Entrar
                        </a>
                    </p>
            </div>
        </div>
    );
}
