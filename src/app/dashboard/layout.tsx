"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [isSectionsOpen, setIsSectionsOpen] = useState(true);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r px-6 py-8 hidden md:block">
        <nav className="space-y-4 text-sm">
          <a href="/dashboard" className="block font-medium text-primary">
            Dashboard
          </a>

          <a href="/dashboard/resumes" className="block text-primary hover:text-hover">
            Meus curriculos
          </a>

          <a href="/dashboard/profile" className="block text-primary hover:text-hover">
            Perfil
          </a>

          <div>
            <button
              type="button"
              onClick={() => setIsSectionsOpen((prev) => !prev)}
              className="w-full flex items-center justify-between block font-medium text-primary"
              aria-expanded={isSectionsOpen}
              aria-controls="dashboard-sections-list"
            >
              Seções
              <span className="text-sm leading-none font-medium">{isSectionsOpen ? "-" : "+"}</span>
            </button>

            {isSectionsOpen && (
              <div id="dashboard-sections-list" className="space-y-3 mt-3">
                <a href="/dashboard/sections/education" className="block text-primary hover:text-hover">
                  Formação
                </a>

                <a href="/dashboard/sections/experience" className="block text-primary hover:text-hover">
                  Experiências
                </a>

                <a href="/dashboard/sections/projects" className="block text-primary hover:text-hover">
                  Projetos
                </a>

                <a href="/dashboard/sections/skills" className="block text-primary hover:text-hover">
                  Habilidades
                </a>

                <a href="/dashboard/sections/languages" className="block text-primary hover:text-hover">
                  Idiomas
                </a>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="block text-primary hover:text-hover text-left w-full"
          >
            Sair
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
