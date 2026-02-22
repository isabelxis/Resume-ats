import {create} from "zustand";
import { api } from "@/src/lib/axios"
import type { AuthUser, Profile } from "./types/auth";

interface AuthState {
    authUser: AuthUser | null;
    profile: Profile | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setAuth: (user: AuthUser, token: string) => void;
    updateProfileInStore: (profile: Profile) => void;
    loadProfile: () => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    authUser: null,
    profile: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: (user, token) => {

        set({
            authUser: user,
            accessToken: token,
            isAuthenticated: true,
            isLoading: false,
        });
        
    },

    updateProfileInStore: (profile) =>
        set({ profile }),
    
    loadProfile: async() => {
        try{
            const token = get().accessToken;

            if(!token) return;

            const res = await api.get("/profile/me", {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            set({profile: res.data});            
        } catch(error){
            console.error("Erro ao carregar perfil", error);
        }
    },

    checkAuth: async () => {
        try{

        const refreshRes = await api.post("/auth/refresh")    
        
        const newAccessToken = refreshRes.data.accessToken;

        set({ accessToken: newAccessToken});
        
        const profileRes = await api.get("/profile/me", {
            headers:{
                Authorization: `Bearer ${newAccessToken}`,
            },
        });
        
        const profile = profileRes.data

        console.log("Profile após refresh:", profile);

        const authUser: AuthUser = {
            id: profile.id,
            email: profile.email,
            plan: profile.plan,            
        };

        set({ authUser,
            profile, 
            isAuthenticated: true, 
            isLoading: false,
        });
        
        } catch {
            set({ authUser: null, 
                profile: null,
                accessToken: null, 
                isAuthenticated: false, 
                isLoading: false,
            });
        }
    
    },

    logout: async() => {
        await api.post("/auth/logout");

        set({ authUser: null, 
            profile: null,
            accessToken: null,
            isAuthenticated: false
        });
    },
}));