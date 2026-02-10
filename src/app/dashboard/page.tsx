"use client";

import { useUserStore } from "@/src/store/userStore";

export default function Dashboard() {
  const user = useUserStore(s => s.user);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Olá 👋
      </h1>

      <p className="text-gray-600 mt-2">
        Plano atual: <strong>{user?.plan}</strong>
      </p>

      {user?.plan === "FREE" && (
        <div className="mt-6 bg-yellow-100 p-4 rounded">
          Faça upgrade para criar currículos ilimitados 🚀
        </div>
      )}
    </div>
  );
}
