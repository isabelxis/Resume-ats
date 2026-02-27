"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";

type SkillItem = {
  id?: number;
  name: string;
  level: string;
  category: string;
};

type SkillErrors = {
  name?: string;
  level?: string;
  category?: string;
  global?: string;
};

export default function Skills() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<SkillErrors>({});

  useEffect(() => {
    if (accessToken) {
      void loadSkills();
    }
  }, [accessToken]);

  async function loadSkills() {
    setIsListLoading(true);
    setErrors((prev) => ({ ...prev, global: undefined }));

    try {
      const res = await api.get("/skills", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSkills(Array.isArray(res.data) ? res.data : []);
    } catch {
      setErrors((prev) => ({ ...prev, global: "Erro ao carregar habilidades" }));
    } finally {
      setIsListLoading(false);
    }
  }

  function clearForm() {
    setName("");
    setLevel("");
    setCategory("");
  }

  async function handleSave() {
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      await api.post(
        "/skills",
        {
          name,
          level,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage("Habilidade adicionada com sucesso");
      clearForm();
      setIsFormOpen(false);
      await loadSkills();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const backendErrors = err.response?.data?.errors;
        const errorMessage = err.response?.data?.message;

        if (backendErrors) {
          setErrors(backendErrors);
        } else if (errorMessage) {
          setErrors({ global: errorMessage });
        } else {
          setErrors({ global: "Erro ao salvar habilidade" });
        }
      } else {
        setErrors({ global: "Erro ao salvar habilidade" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Habilidades</h1>

        <button
          type="button"
          onClick={() => {
            setMessage("");
            setErrors({});
            setIsFormOpen((prev) => !prev);
          }}
          className="bg-secondary text-primary py-2 px-4 rounded"
        >
          {isFormOpen ? "Cancelar" : "Nova habilidade"}
        </button>
      </div>

      {isListLoading ? (
        <p className="text-sm text-primary">Carregando habilidades...</p>
      ) : skills.length === 0 ? (
        <p className="text-sm text-primary mb-6">Nenhuma habilidade cadastrada ainda.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {skills.map((skill) => (
            <div
              key={`${skill.id ?? "skill"}-${skill.name}-${skill.level}`}
              className="border rounded p-4 bg-white"
            >
              <p className="font-semibold">{skill.name}</p>
              {skill.level && <p className="text-sm text-primary mt-1">Nivel: {skill.level}</p>}
              {skill.category && <p className="text-sm text-primary mt-1">Categoria: {skill.category}</p>}
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="grid gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Nome</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: JavaScript"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Nivel</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Ex: Avancado"
            />
            {errors.level && <p className="text-red-500 text-sm mt-2">{errors.level}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Categoria</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex: Backend"
            />
            {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
          </div>
        </div>
      )}

      {errors.global && <p className="mt-4 text-sm text-red-500">{errors.global}</p>}

      {isFormOpen && (
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-secondary text-primary py-2 rounded mt-6"
        >
          {loading ? "Salvando..." : "Salvar habilidade"}
        </button>
      )}

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
