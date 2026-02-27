"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";

type LanguageItem = {
  id?: number;
  name: string;
  proficiency: string;
  certification: string;
};

type LanguageErrors = {
  name?: string;
  proficiency?: string;
  certification?: string;
  global?: string;
};

export default function Languages() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);

  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [certification, setCertification] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<LanguageErrors>({});

  useEffect(() => {
    if (accessToken) {
      void loadLanguages();
    }
  }, [accessToken]);

  async function loadLanguages() {
    setIsListLoading(true);
    setErrors((prev) => ({ ...prev, global: undefined }));

    try {
      const res = await api.get("/languages", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLanguages(Array.isArray(res.data) ? res.data : []);
    } catch {
      setErrors((prev) => ({ ...prev, global: "Erro ao carregar idiomas" }));
    } finally {
      setIsListLoading(false);
    }
  }

  function clearForm() {
    setName("");
    setProficiency("");
    setCertification("");
  }

  async function handleSave() {
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      await api.post(
        "/languages",
        {
          name,
          proficiency,
          certification,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage("Idioma adicionado com sucesso");
      clearForm();
      setIsFormOpen(false);
      await loadLanguages();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const backendErrors = err.response?.data?.errors;
        const errorMessage = err.response?.data?.message;

        if (backendErrors) {
          setErrors(backendErrors);
        } else if (errorMessage) {
          setErrors({ global: errorMessage });
        } else {
          setErrors({ global: "Erro ao salvar idioma" });
        }
      } else {
        setErrors({ global: "Erro ao salvar idioma" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Idiomas</h1>

        <button
          type="button"
          onClick={() => {
            setMessage("");
            setErrors({});
            setIsFormOpen((prev) => !prev);
          }}
          className="bg-secondary text-primary py-2 px-4 rounded"
        >
          {isFormOpen ? "Cancelar" : "Novo idioma"}
        </button>
      </div>

      {isListLoading ? (
        <p className="text-sm text-primary">Carregando idiomas...</p>
      ) : languages.length === 0 ? (
        <p className="text-sm text-primary mb-6">Nenhum idioma cadastrado ainda.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {languages.map((language) => (
            <div
              key={`${language.id ?? "language"}-${language.name}-${language.proficiency}`}
              className="border rounded p-4 bg-white"
            >
              <p className="font-semibold">{language.name}</p>
              {language.proficiency && (
                <p className="text-sm text-primary mt-1">Proficiencia: {language.proficiency}</p>
              )}
              {language.certification && (
                <p className="text-sm text-primary mt-1">Certificacao: {language.certification}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="grid gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Idioma</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Ingles"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Proficiencia</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              placeholder="Ex: Fluente"
            />
            {errors.proficiency && <p className="text-red-500 text-sm mt-2">{errors.proficiency}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Certificacao</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
              placeholder="Ex: TOEFL iBT"
            />
            {errors.certification && <p className="text-red-500 text-sm mt-2">{errors.certification}</p>}
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
          {loading ? "Salvando..." : "Salvar idioma"}
        </button>
      )}

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
