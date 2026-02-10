"use client";

import { useState } from "react";
import { api } from "@/src/services/api";
import { useUserStore } from "@/src/store/userStore";

export default function Login() {
  const setUser = useUserStore(s => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  }

  return (
    <div className="max-w-md mx-auto mt-32">
      <h2 className="text-2xl font-bold mb-6">Entrar</h2>

      <input
        className="input"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="input mt-4"
        type="password"
        placeholder="Senha"
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="mt-6 w-full bg-black text-white py-2 rounded"
      >
        Entrar
      </button>
    </div>
  );
}