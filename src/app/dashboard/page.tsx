"use client";

import { useAuthStore } from "@/src/store/authStore";

export default function DashboardPage() {
  const profile = useAuthStore((s) => s.profile);

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Olá {profile?.name || ""}
        </h1>

        <p className="text-primary mt-2">
          Gerencie seus currículos e acompanhe seu plano.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-primary mb-2">
            Plano atual
          </p>
          <p className="text-xl font-semibold">
            {profile?.plan}
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-primary mb-2">
            Currículos criados
          </p>
          <p className="text-xl font-semibold">
            0
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm text-primary mb-2">
              Novo currículo
            </p>
            <p className="text-sm text-primary">
              Inicie um currículo otimizado para ATS.
            </p>
          </div>

          <a
            href="/resume/new"
            className="mt-6 bg-secondary text-primary text-sm px-4 py-2 rounded-md text-center"
          >
            Criar agora
          </a>
        </div>

      </div>
    </>
  );
}
