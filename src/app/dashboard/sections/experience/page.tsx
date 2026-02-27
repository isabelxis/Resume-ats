"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";

type ExperienceItem = {
  id?: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  skills: string;
  models: string;
  current: string;
  location: string;
  employmentType: string;
};

type ExperienceErrors = {
  company?: string;
  position?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  skills?: string;
  models?: string;
  current?: string;
  location?: string;
  employmentType?: string;
  global?: string;
};

function normalizeOptions(data: unknown): string[] {
  const rawList =
    Array.isArray(data)
      ? data
      : Array.isArray((data as { data?: unknown[] })?.data)
      ? (data as { data: unknown[] }).data
      : Array.isArray((data as { options?: unknown[] })?.options)
      ? (data as { options: unknown[] }).options
      : [];

  const options = rawList
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (item && typeof item === "object") {
        const option = item as Record<string, unknown>;
        const value = option.value ?? option.label ?? option.name ?? option.type;
        return typeof value === "string" ? value : "";
      }

      return "";
    })
    .filter((value): value is string => value.trim().length > 0);

  return [...new Set(options)];
}

export default function Experience() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [models, setModels] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [employmentTypeOptions, setEmploymentTypeOptions] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ExperienceErrors>({});

  useEffect(() => {
    if (accessToken) {
      void Promise.all([loadExperiences(), loadSelectOptions()]);
    }
  }, [accessToken]);

  async function loadExperiences() {
    setIsListLoading(true);
    setErrors((prev) => ({ ...prev, global: undefined }));

    try {
      const res = await api.get("/experiences", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setExperiences(Array.isArray(res.data) ? res.data : []);
    } catch {
      setErrors((prev) => ({ ...prev, global: "Erro ao carregar experiencias" }));
    } finally {
      setIsListLoading(false);
    }
  }

  async function loadSelectOptions() {
    try {
      const [modelsRes, employmentTypeRes] = await Promise.all([
        api.get("/experiences/models", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        api.get("/experiences/models", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      ]);

      setModelOptions(normalizeOptions(modelsRes.data));
      setEmploymentTypeOptions(normalizeOptions(employmentTypeRes.data));
    } catch {
      setErrors((prev) => ({
        ...prev,
        global: prev.global ?? "Erro ao carregar opcoes de modelo e tipo de contratacao",
      }));
    }
  }

  function clearForm() {
    setCompany("");
    setPosition("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setSkills("");
    setModels("");
    setLocation("");
    setEmploymentType("");
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
        "/experiences",
        {
          company,
          position,
          description,
          startDate,
          endDate,
          skills,
          models,
          current: endDate.trim() === "",
          location,
          employmentType,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage("Experiencia adicionada com sucesso");
      clearForm();
      setIsFormOpen(false);
      await loadExperiences();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const backendErrors = err.response?.data?.errors;
        const errorMessage = err.response?.data?.message;

        if (backendErrors) {
          setErrors(backendErrors);
        } else if (errorMessage) {
          setErrors({ global: errorMessage });
        } else {
          setErrors({ global: "Erro ao salvar experiencia" });
        }
      } else {
        setErrors({ global: "Erro ao salvar experiencia" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Experiencias</h1>

        <button
          type="button"
          onClick={() => {
            setMessage("");
            setErrors({});
            setIsFormOpen((prev) => !prev);
          }}
          className="bg-secondary text-primary py-2 px-4 rounded"
        >
          {isFormOpen ? "Cancelar" : "Nova experiencia"}
        </button>
      </div>

      {isListLoading ? (
        <p className="text-sm text-primary">Carregando experiencias...</p>
      ) : experiences.length === 0 ? (
        <p className="text-sm text-primary mb-6">Nenhuma experiencia cadastrada ainda.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {experiences.map((experience) => (
            <div
              key={`${experience.id ?? "experience"}-${experience.company}-${experience.startDate}`}
              className="border rounded p-4 bg-white"
            >
              <p className="font-semibold">{experience.company}</p>
              <p className="text-sm text-primary">{experience.position}</p>
              <p className="text-sm text-primary mt-1">
                {formatDate(experience.startDate)} -{" "}
                {experience.endDate ? formatDate(experience.endDate) : "Atual"}
              </p>
              {experience.description && (
                <p className="text-sm text-primary mt-1">{experience.description}</p>
              )}
              {experience.skills && <p className="text-sm text-primary mt-1">Skills: {experience.skills}</p>}
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="grid gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Empresa</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nome da empresa"
            />
            {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Cargo</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Ex: Desenvolvedor Full Stack"
            />
            {errors.position && <p className="text-red-500 text-sm mt-2">{errors.position}</p>}
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
            <label className="block mb-2 text-sm font-medium">Descricao</label>
            <textarea
              className="w-full border rounded px-3 py-2 min-h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Atividades e resultados principais"
            />
            {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Skills</label>
            <textarea
              className="w-full border rounded px-3 py-2 min-h-24"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Ex: React, Node.js, SQL"
            />
            {errors.skills && <p className="text-red-500 text-sm mt-2">{errors.skills}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Modelo de trabalho</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={models}
              onChange={(e) => setModels(e.target.value)}
            >
              <option value="">Selecione o modelo</option>
              {modelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.models && <p className="text-red-500 text-sm mt-2">{errors.models}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Localizacao</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Sao Paulo, Brasil"
            />
            {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Tipo de contratacao</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
            >
              <option value="">Selecione o tipo</option>
              {employmentTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.employmentType && <p className="text-red-500 text-sm mt-2">{errors.employmentType}</p>}
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
          {loading ? "Salvando..." : "Salvar experiencia"}
        </button>
      )}

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
