"use client";

import { useUserStore } from "@/src/store/userStore";

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Olá {user?.name || ""}
        </h1>

        <p className="text-gray-600 mt-2">
          Gerencie seus currículos e acompanhe seu plano.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-2">
            Plano atual
          </p>
          <p className="text-xl font-semibold">
            {user?.plan}
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-2">
            Currículos criados
          </p>
          <p className="text-xl font-semibold">
            0
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Novo currículo
            </p>
            <p className="text-sm text-gray-600">
              Inicie um currículo otimizado para ATS.
            </p>
          </div>

          <a
            href="/resume/new"
            className="mt-6 bg-black text-white text-sm px-4 py-2 rounded-md text-center"
          >
            Criar agora
          </a>
        </div>

      </div>
    </>
  );
}
