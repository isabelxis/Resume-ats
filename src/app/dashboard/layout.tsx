"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/userStore";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const {user, logout} = useUserStore();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r px-6 py-8 hidden md:block">
        <div className="mb-12">
          <h2 className="text-lg font-semibold tracking-tight">
            ResumeATS
          </h2>
        </div>

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

        {/* TOPBAR */}
        <header className="bg-white border-b px-8 py-4 flex justify-end items-center">
            <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">
                    {user?.email}
                </span>

                <div className="h-4 w-px bg-gray-300" />

                <button
                    onClick={handleLogout}
                    className="hover:text-black text-gray-600 transition"
                >
                    Sair
                </button>
            </div>
        </header>

        {/* CONTENT */}
        <main className="p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
