"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect} from "react";
import { useAuthStore } from "@/src/store/authStore";

export default function Navbar(){
    const {isAuthenticated, checkAuth, user,logout, isLoading} = useAuthStore();
    

    useEffect(() => {
        checkAuth();
    }, []);

     if (isLoading) return null;

    return(
        <header className="w-full border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-0.5 cursor-pointer">
                <Link href="/">
                <FontAwesomeIcon icon={faFileCircleCheck} className="text-2xl" />
                <span className="font-semibold tracking-tight">
                    ResumeATS
                </span>
                </Link>
                </div>

                <div className="flex items-center gap-6 text-sm">
                {!isAuthenticated ? ( <>
                    <Link href="/login" className="hover:text-black">
                        Entrar
                    </Link>

                    <Link href="/register"
                        className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-hover transition">
                        Criar conta
                    </Link>
                </> 
                ) : (
                <>
                    <span className="text-primary">
                        {user?.email ?? user?.email} 
                    </span>
                    <div className="h-4 w-px bg-gray-300" />

                        <button
                            onClick={logout} className="hover:bg-hover text-primary transition">
                            Sair
                        </button>

                </>    
                )}
            </div>
        </div>
        </header>
    );
}