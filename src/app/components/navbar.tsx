"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/src/store/authStore";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const authUser = useAuthStore((s) => s.authUser);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isLoading = useAuthStore((s) => s.isLoading);
    const logout = useAuthStore((s) => s.logout);

    if (isLoading) return null;

    const showLogin = pathname !== "/login";
    const showRegister = pathname !== "/register";
    const showNothing = pathname == "/reset-password"

    async function handleLogout() {
        await logout();
        router.push("/");
    }

    return (
        <header className="w-full border-b">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-0.5 cursor-pointer">
                    <Link href="/">
                        <FontAwesomeIcon icon={faFileCircleCheck} className="text-2xl" />
                        <span className="font-semibold tracking-tight">ResumeATS</span>
                    </Link>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    {isAuthenticated && authUser ? (
                        <>
                            <span className="text-primary">{authUser?.email}</span>
                            <div className="h-4 w-px bg-gray-300" />

                            <button onClick={handleLogout} className="hover:bg-hover text-primary transition">
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            {showLogin && !showNothing && (
                                <Link href="/login" className="hover:text-black">
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
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
