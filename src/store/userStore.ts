import {create} from 'zustand';

type User = {
  id: number;
  email: string;
  plan: string;
};

type State = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<State>(set => ({
  user: null,
  setUser: user => set({ user }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));