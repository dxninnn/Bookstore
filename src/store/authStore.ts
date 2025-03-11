import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  user: null | { email: string };
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email) => set({ isAuthenticated: true, user: { email } }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));