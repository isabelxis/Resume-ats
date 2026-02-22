"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const {authUser, logout} = useAuthStore();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r px-6 py-8 hidden md:block">
        <nav className="space-y-4 text-sm">
          <a href="/dashboard" className="block font-medium text-black">
            Dashboard
          </a>

          <a href="/dashboard/resumes" className="block text-gray-600 hover:text-black">
            Meus currículos
          </a>

          <a href="/dashboard/profile" className="block text-gray-600 hover:text-black">
            Perfil
          </a>
          <button
            onClick={handleLogout}
            className="block text-gray-600 hover:text-black text-left w-full"
          >
            Sair
          </button>
        </nav>
      </aside>


      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* CONTENT */}
        <main className="p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
