"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";

type ProjectItem = {
  id?: number;
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  technologies: string;
};

type ProjectErrors = {
  name?: string;
  description?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  technologies?: string;
  global?: string;
};

export default function Projects() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [technologies, setTechnologies] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ProjectErrors>({});

  useEffect(() => {
    if (accessToken) {
      void loadProjects();
    }
  }, [accessToken]);

  async function loadProjects() {
    setIsListLoading(true);
    setErrors((prev) => ({ ...prev, global: undefined }));

    try {
      const res = await api.get("/projects", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch {
      setErrors((prev) => ({ ...prev, global: "Erro ao carregar projetos" }));
    } finally {
      setIsListLoading(false);
    }
  }

  function clearForm() {
    setName("");
    setDescription("");
    setUrl("");
    setStartDate("");
    setEndDate("");
    setTechnologies("");
  }

  function formatDate(date: string) {
    const parts = date.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    return date;
  }

  async function handleSave() {
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      await api.post(
        "/projects",
        {
          name,
          description,
          url,
          startDate,
          endDate,
          technologies,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage("Projeto adicionado com sucesso");
      clearForm();
      setIsFormOpen(false);
      await loadProjects();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const backendErrors = err.response?.data?.errors;
        const errorMessage = err.response?.data?.message;

        if (backendErrors) {
          setErrors(backendErrors);
        } else if (errorMessage) {
          setErrors({ global: errorMessage });
        } else {
          setErrors({ global: "Erro ao salvar projeto" });
        }
      } else {
        setErrors({ global: "Erro ao salvar projeto" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projetos</h1>

        <button
          type="button"
          onClick={() => {
            setMessage("");
            setErrors({});
            setIsFormOpen((prev) => !prev);
          }}
          className="bg-secondary text-primary py-2 px-4 rounded"
        >
          {isFormOpen ? "Cancelar" : "Novo projeto"}
        </button>
      </div>

      {isListLoading ? (
        <p className="text-sm text-primary">Carregando projetos...</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-primary mb-6">Nenhum projeto cadastrado ainda.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {projects.map((project) => (
            <div
              key={`${project.id ?? "project"}-${project.name}-${project.startDate}`}
              className="border rounded p-4 bg-white"
            >
              <p className="font-semibold">{project.name}</p>
              <p className="text-sm text-primary mt-1">{project.description}</p>
              <p className="text-sm text-primary mt-1">
                {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : "Atual"}
              </p>
              {project.technologies && (
                <p className="text-sm text-primary mt-1">Tecnologias: {project.technologies}</p>
              )}
              {project.url && (
                <a href={project.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 mt-1 block">
                  {project.url}
                </a>
              )}
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
              placeholder="Nome do projeto"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Descricao</label>
            <textarea
              className="w-full border rounded px-3 py-2 min-h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Resumo do projeto"
            />
            {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">URL</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
            {errors.url && <p className="text-red-500 text-sm mt-2">{errors.url}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Data de inicio</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-2">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Data de termino</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-2">{errors.endDate}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Tecnologias</label>
            <textarea
              className="w-full border rounded px-3 py-2 min-h-24"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Ex: Next.js, Spring Boot, PostgreSQL"
            />
            {errors.technologies && <p className="text-red-500 text-sm mt-2">{errors.technologies}</p>}
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
          {loading ? "Salvando..." : "Salvar projeto"}
        </button>
      )}

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
