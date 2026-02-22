"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const { logout } = useAuthStore();

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
