"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";

export default function Profile() {
  const profile = useAuthStore(s => s.profile);
  const accessToken = useAuthStore(s => s.accessToken);

  const updateProfileInStore = useAuthStore(s => s.updateProfileInStore);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
    }
  }, [profile]);

  async function handleSave() {
    setLoading(true);
    setMessage("");

    try {
      const res = await api.put("/profile/me", { name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      updateProfileInStore(res.data);

      setMessage("Perfil atualizado com sucesso");

    } catch (err) {
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
        className="w-full bg-secondary text-primary py-2 rounded"
      >
        {loading ? "Salvando..." : "Salvar alterações"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-primary">
          {message}
        </p>
      )}
    </div>
  );
}