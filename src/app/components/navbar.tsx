"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck, faBars,faX } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/src/store/authStore";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSectionsOpen, setIsSectionsOpen] = useState(true);

    const authUser = useAuthStore((s) => s.authUser);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isLoading = useAuthStore((s) => s.isLoading);
    const logout = useAuthStore((s) => s.logout);

    if (isLoading) return null;

    const isDashboardRoute = pathname.startsWith("/dashboard");
    const showLogin = pathname !== "/login";
    const showRegister = pathname !== "/register";
    const showNothing = pathname == "/reset-password"

    async function handleLogout() {
        await logout();
        setIsMobileMenuOpen(false);
        router.push("/");
    }

    function closeMobileMenu() {
        setIsMobileMenuOpen(false);
    }

    return (
        <header className="w-full border-b relative z-50 bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-0.5 cursor-pointer">
                    <Link href="/">
                        <FontAwesomeIcon icon={faFileCircleCheck} className="text-2xl text-primary hover:text-hover" />
                        <span className="font-semibold tracking-tight text-primary">ResumeATS</span>
                    </Link>
                </div>

                {isAuthenticated && authUser ? (
                    <>
                        {isDashboardRoute && (
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                                className="md:hidden h-10 w-10 rounded-md flex items-center justify-center"
                                aria-label="Abrir menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <FontAwesomeIcon icon={faBars} className="text-2xl text-primary hover:text-hover" />
                            </button>
                        )}

                        <div className="hidden md:flex items-center gap-6 text-sm">
                            <span className="text-primary">{authUser?.email}</span>
                            <div className="h-4 w-px bg-gray-300" />

                            <button onClick={handleLogout} className="hover:text-hover text-primary transition">
                                Sair
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-6 text-sm">
                        {showLogin && !showNothing && (
                            <Link href="/login" className="hover:text-hover">
                                Entrar
                            </Link>
                        )}

                            {showRegister && !showNothing && (
                            <Link
                                href="/register"
                                className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-hover transition"
                            >
                                Criar conta
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {isAuthenticated && isDashboardRoute && isMobileMenuOpen && (
                <>

                    <aside className="fixed top-0 right-0 h-full w-64 bg-white border-r px-6 py-8 md:hidden z-50">
                        <nav className="space-y-4 text-sm">
                            <div className="flex justify-between items-center cursor-pointer">
                                <Link href="/dashboard" className="block font-medium text-primary" onClick={closeMobileMenu}>
                                    Dashboard
                                </Link>
                                <button
                                    type="button"
                                    onClick={closeMobileMenu}
                                    aria-label="Fechar menu"
                                >
                                    <FontAwesomeIcon icon={faX} className="text-1xl text-primary hover:text-hover" />
                                </button>
                            </div>

                            <Link href="/dashboard/resumes" className="block text-primary hover:text-hover" onClick={closeMobileMenu}>
                                Meus curriculos
                            </Link>

                            <Link href="/sections/profile" className="block text-primary hover:text-hover" onClick={closeMobileMenu}>
                                Perfil
                            </Link>
                            <div>
                                <button
                                type="button"
                                onClick={() => setIsSectionsOpen((prev) => !prev)}
                                className="w-full flex items-center justify-between block text-primary"
                                aria-expanded={isSectionsOpen}
                                aria-controls="dashboard-sections-list"
                                >
                                Seções
                                <span className="text-sm leading-none">{isSectionsOpen ? "-" : "+"}</span>
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
                </>
            )}
        </header>
    );
}
