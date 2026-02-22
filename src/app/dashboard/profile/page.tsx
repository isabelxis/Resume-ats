"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";

type ProfileErrors = {
  name?: string;
  global?: string;
};

export default function Profile() {
  const profile = useAuthStore((s) => s.profile);
  const accessToken = useAuthStore((s) => s.accessToken);
  const updateProfileInStore = useAuthStore((s) => s.updateProfileInStore);

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ProfileErrors>({});

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setHeadline(profile.headline || "");
      setPhone(profile.phone || "");
      setLocation(profile.location || "");
      setLinkedin(profile.linkedin || "");
      setGithub(profile.github || "");
      setPortfolio(profile.portfolio || "");
    }
  }, [profile]);

  async function handleSave() {
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      const payload = {
        name,
        headline,
        phone,
        location,
        linkedin,
        github,
        portfolio,
      };

      const res = await api.put("/profile/me", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      updateProfileInStore(res.data);
      setMessage("Perfil atualizado com sucesso");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const backendErrors = err.response?.data?.errors;
        const message = err.response?.data?.message;

        if (backendErrors?.name) {
          setErrors({ name: backendErrors.name });
        } else if (message) {
          setErrors({ global: message });
        } else {
          setErrors({ global: "Erro ao atualizar perfil" });
        }
      } else {
        setErrors({ global: "Erro ao atualizar perfil" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>

      <div className="grid gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Nome</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
          {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Headline</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Ex: Desenvolvedor Full Stack"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Telefone</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Localidade</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Cidade, Estado"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">LinkedIn</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/seu-perfil"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">GitHub</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/seu-usuario"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Portfolio</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="https://seusite.com"
          />
        </div>
      </div>

      {errors.global && <p className="mt-4 text-sm text-red-500">{errors.global}</p>}

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-secondary text-primary py-2 rounded mt-6"
      >
        {loading ? "Salvando..." : "Salvar alteracoes"}
      </button>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
