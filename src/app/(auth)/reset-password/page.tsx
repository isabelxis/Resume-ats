"use client";

import { useState } from "react";
import { api } from "@/src/lib/axios";  
import { useSearchParams } from "next/navigation"; 

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        newPassword?: string;
        global?: string;
        }>({});

    async function handleReset() {
        setErrors({});
        if (password !== confirmPassword) {
            setErrors({ global: "As senhas não coincidem" });
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/auth/reset-password", {
                token,
                newPassword: password,
            });
            setMessage(res.data.message);
        } catch (err: any) {
            const backendErrors = err.response?.data?.errors;
            const message = err.response?.data?.message;

            if (backendErrors) {
            // validações de campo (400)
            setErrors(backendErrors);
            //console.log(err.response);
            } else if (message) {
            // erro de negócio (401 / 404)
            setErrors({ global: message });
            } else {
            // erro genérico
            setErrors({ global: "Erro ao redefinir senha" });
            }
        } finally {
            setLoading(false);
        }
}

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 border rounded">
                <h2 className="text-2xl font-bold mb-6">Redefinir senha</h2>
                
                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    placeholder="Nova senha"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    placeholder="Confirmar nova senha"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                {errors.newPassword && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.newPassword}
                    </p>
                )}
                {errors.global && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.global}
                    </p>
                )}

                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="w-full bg-secondary text-primary py-2 rounded disabled:opacity-50"
                >
                  
                  {loading ? "Redefinindo senha..." : "Redefinir senha"}
                </button>
                <p className="text-sm text-primary mt-6 text-center">
                    Abri tela de login?{" "}
                    <a href="/login" className="text-blue-500">
                        Login
                    </a>
                </p>
                {message && (
                  <div className="mt-4 text-green-500">
                    {message}
                  </div>
                )}
            </div>
        </div>
    );
}