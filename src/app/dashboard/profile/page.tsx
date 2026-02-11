"use client";

import { useState } from "react";
import { api } from "@/src/services/api";
import { useUserStore } from "@/src/store/userStore";

export default function Profile() {
  const user = useUserStore(s => s.user);
  const setUser = useUserStore(s => s.setUser);

  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setLoading(true);
    setMessage("");

    try {
      const res = await api.put("/users/me", { name });

      setUser(res.data);
      setMessage("Perfil atualizado com sucesso");

    } catch (err: any) {
      setMessage("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>

      <label className="block mb-2 text-sm font-medium">
        Nome
      </label>

      <input
        className="w-full border rounded px-3 py-2 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Seu nome"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded"
      >
        {loading ? "Salvando..." : "Salvar alterações"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-600">
          {message}
        </p>
      )}
    </div>
  );
}