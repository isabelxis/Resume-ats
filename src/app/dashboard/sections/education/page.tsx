"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/src/lib/axios";
import { useAuthStore } from "@/src/store/authStore";

type EducationItem = {
  id?: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  GPA: string;
  skills: string;
};

type EducationErrors = {
  institution?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  GPA?: string;
  skills?: string;
  global?: string;
};

export default function Education() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);

  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gpa, setGpa] = useState("");
  const [skills, setSkills] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<EducationErrors>({});

  useEffect(() => {
    if (accessToken) {
      void loadEducations();
    }
  }, [accessToken]);

  async function loadEducations() {
    setIsListLoading(true);
    setErrors((prev) => ({ ...prev, global: undefined }));

    try {
      const res = await api.get("/educations", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = Array.isArray(res.data) ? res.data : [];
      setEducations(data);
    } catch {
      setErrors((prev) => ({
        ...prev,
        global: "Erro ao carregar formacoes academicas",
      }));
    } finally {
      setIsListLoading(false);
    }
  }

  function clearForm() {
    setInstitution("");
    setDegree("");
    setStartDate("");
    setEndDate("");
    setGpa("");
    setSkills("");
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
      const payload = {
        institution,
        degree,
        startDate,
        endDate,
        gpa,
        skills,
      };

      await api.post("/educations", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage("Formacao academica adicionada com sucesso");
      clearForm();
      setIsFormOpen(false);
      await loadEducations();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const backendErrors = err.response?.data?.errors;
        const errorMessage = err.response?.data?.message;

        if (backendErrors) {
          setErrors(backendErrors);
        } else if (errorMessage) {
          setErrors({ global: errorMessage });
        } else {
          setErrors({ global: "Erro ao salvar formacao academica" });
        }
      } else {
        setErrors({ global: "Erro ao salvar formacao academica" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Formacao Academica</h1>

        <button
          type="button"
          onClick={() => {
            setMessage("");
            setErrors({});
            setIsFormOpen((prev) => !prev);
          }}
          className="bg-secondary text-primary py-2 px-4 rounded"
        >
          {isFormOpen ? "Cancelar" : "Nova formacao"}
        </button>
      </div>

      {isListLoading ? (
        <p className="text-sm text-primary">Carregando formacoes...</p>
      ) : educations.length === 0 ? (
        <p className="text-sm text-primary mb-6">Nenhuma formacao cadastrada ainda.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {educations.map((education) => (
            <div
              key={`${education.id ?? "education"}-${education.institution}-${education.startDate}`}
              className="border rounded p-4 bg-white"
            >
              <p className="font-semibold">{education.institution}</p>
              <p className="text-sm text-primary">{education.degree}</p>
              <p className="text-sm text-primary mt-1">
                {formatDate(education.startDate)} - {education.endDate ? formatDate(education.endDate) : "Atual"}
              </p>
              {education.GPA && <p className="text-sm text-primary mt-1">GPA: {education.GPA}</p>}
              {education.skills && <p className="text-sm text-primary mt-1">Skills: {education.skills}</p>}
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="grid gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Instituicao</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Nome da instituicao"
            />
            {errors.institution && (
              <p className="text-red-500 text-sm mt-2">{errors.institution}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Curso</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Ex: Bacharelado em Ciencia da Computacao"
            />
            {errors.degree && <p className="text-red-500 text-sm mt-2">{errors.degree}</p>}
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
            <label className="block mb-2 text-sm font-medium">GPA</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              placeholder="Ex: 3.8/4.0"
            />
            {errors.GPA && <p className="text-red-500 text-sm mt-2">{errors.GPA}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Skills</label>
            <textarea
              className="w-full border rounded px-3 py-2 min-h-24"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Ex: Estrutura de Dados, Algoritmos, Banco de Dados"
            />
            {errors.skills && <p className="text-red-500 text-sm mt-2">{errors.skills}</p>}
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
          {loading ? "Salvando..." : "Salvar formacao"}
        </button>
      )}

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
