export default function Home() {
  return (
    <main className="max-w-5xl mx-auto py-24 px-6 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Currículos que passam no ATS
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Crie currículos otimizados para sistemas de recrutamento e aumente
        suas chances de entrevista.
      </p>

      <a
        href="/register"
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Criar meu currículo
      </a>
    </main>
  );
}
