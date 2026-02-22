"use client";

import { useState } from "react";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";  

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
          email?: string;
          password?: string;
          global?: string;
        }>({});

  async function handleLogin() {
    setErrors({});
    setLoading(true);
    try {

        const res = await api.post("/auth/login", { 
            email,
            password 
        });

        useAuthStore.getState().setAuth(
          res.data.user,
          res.data.accessToken
        );

        await useAuthStore.getState().loadProfile();

        router.push("/dashboard");
        router.refresh();

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
            <h2 className="text-2xl font-bold mb-6">Entrar</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <input
                type="email"
                className="w-full border rounded px-3 py-2 mb-4"
                placeholder="Email"
                value ={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mb-3">
                  {errors.email}
                </p>
              )}

              <input
                type="password"
                className="w-full border rounded px-3 py-2 mb-4"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
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
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-secondary text-primary py-2 rounded disabled:opacity-50"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
            
            <p className="text-sm text-primary mt-6 text-center">
                Esqueceu a senha?{" "}
                <a href="/forgot-password" className="text-blue-500">
                    Recuperar Senha
                </a>
            </p>
            <p className="text-sm text-primary mt-6 text-center">
                Criar conta?{" "}
                <a href="/register" className="text-blue-500">
                    Criar Conta
                </a>
            </p>
        </div>
    </div>
  );
}
