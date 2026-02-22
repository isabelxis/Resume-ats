"use client";

import { useState } from "react";
import { api } from "@/src/lib/axios";

type AuthErrors = {
  email?: string;
  global?: string;
};

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthErrors>({});

  async function handleSubmit() {
    setErrors({});
    
    try {
        setLoading(true);
        const res = await api.post("/auth/forgot-password", { email });
        setMessage(res.data.message);
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
          setErrors({ global: "Erro ao enviar instruções de redefinição de senha" });
        }
  } finally {
        setLoading(false);
    }
}

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 border rounded">
                <h2 className="text-2xl font-bold mb-6">Esqueci minha senha</h2>    

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.email}
                    </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-secondary text-primary py-2 rounded disabled:opacity-50"
                >
                  {loading ? "Enviando instruções..." : "Enviar instruções"}
                </button>
                <p className="text-sm text-primary mt-6 text-center">
                    Retornar a tela de login{" "}
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