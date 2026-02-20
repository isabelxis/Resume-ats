import {create} from "zustand";
import { api } from "@/src/lib/axios"

interface User {
  id: number;
  email: string;
  name?: string;
  plan: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAuth: (user: User, token: string) => void;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: (user, token) =>
        set({
            user,
            accessToken: token,
            isAuthenticated: true,
            isLoading: false,
        }),

    checkAuth: async () => {
        try{

        const refreshRes = await api.post("/auth/refresh")    
        //const token = useAuthStore.getState().accessToken;

        //if(!token) return;
        const newAccessToken = refreshRes.data.accessToken;
        
        set({ accessToken: newAccessToken});
        
        const userRes = await api.get("/profile/me");

        set({ user: userRes.data, isAuthenticated: true, isLoading: false,});
        } catch {
            set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false,});
        }
    },

    logout: async() => {
        await api.post("/logout");
        set({ user: null, accessToken: null, isAuthenticated: false});
    },
}));