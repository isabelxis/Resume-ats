"use client";

import { useAuthStore } from "@/src/store/authStore";

export default function Home() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const ctaHref = isAuthenticated ? "/dashboard" : "/register";

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          Currículos que passam no ATS
        </h1>

        <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
          Crie um currículo estruturado para sistemas de triagem automática
          e aumente suas chances reais de conseguir entrevistas.
        </p>

        <div className="mt-10">
          <a
            href={ctaHref}
            className="bg-secondary text-primary px-8 py-3 rounded-md text-lg hover:bg-hover transition"
          >
            Começar gratuitamente
          </a>
        </div>
      </section>


      {/* PROBLEMA */}
      <section className="border-t py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl font-semibold tracking-tight">
            Seu currículo pode estar sendo descartado
          </h2>

          <p className="mt-6 leading-relaxed">
            A maioria das empresas utiliza sistemas ATS (Applicant Tracking System)
            para filtrar candidatos automaticamente.
            Se o formato não estiver adequado, seu currículo pode não ser analisado por um recrutador.
          </p>

        </div>
      </section>


      {/* BENEFÍCIOS */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-left">

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Estrutura compatível com ATS
            </h3>
            <p className="leading-relaxed">
              Formatação padronizada para garantir leitura correta pelos sistemas automatizados.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Otimização por palavras-chave
            </h3>
            <p className="leading-relaxed">
              Inclusão estratégica de termos relevantes para aumentar a compatibilidade com a vaga.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Design profissional e objetivo
            </h3>
            <p className="leading-relaxed">
              Layout limpo, claro e focado em destacar suas competências.
            </p>
          </div>

        </div>
      </section>


      {/* CTA FINAL */}
      <section className="py-32 px-6 text-center border-t">
        <h2 className="text-3xl font-semibold tracking-tight">
          Aumente suas chances de contratação
        </h2>

        <p className="mt-6 ">
          Crie agora seu currículo otimizado para ATS.
        </p>

        <div className="mt-10">
          <a
            href={ctaHref}
            className="bg-secondary text-primary hover:bg-hover px-8 py-3 rounded-md text-lg"
          >
            Criar meu currículo
          </a>
        </div>
      </section>

    </main>
  );
}
