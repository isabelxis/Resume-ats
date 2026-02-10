"use client";

import { useState } from "react";
import { api } from "@/src/services/api";
import { useUserStore } from "@/src/store/userStore";   
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

export default function Register() {
  const setUser = useUserStore(s => s.setUser);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    try {
        setLoading(true);
        setError("");

        const res = await api.post("/auth/register", { email, password });

        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        router.push("/dashboard");
    } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao registrar");
    } finally {
        setLoading(false);
    }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 border rounded">
                <h1 className="text-3xl font-bold mb-6">Criar Conta</h1>

                <p className="text-gray-600 mb-4">
                    Crie uma conta para começar a criar currículos otimizados para ATS.
                </p>  

            {error && <div className="mb-4 text-red-500">{error}</div>} 

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded">
                        {loading ? "Criando..." : "Criar Conta"}
                    </button>

                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Já tem uma conta?{" "}
                        <a href="/login" className="text-blue-500">
                            Entrar
                        </a>
                    </p>
            </div>
        </div>
    );
}   