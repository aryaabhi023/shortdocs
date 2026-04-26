import { create } from "zustand";

export const useUserStore = create((set) => ({
  // undefined while auth initializes, null when no user, object when signed in
  user: undefined,
  initialized: false,
  setUser: (userData) => set({ user: userData }),
  setInitialized: (value) => set({ initialized: value }),
  clearUser: () => set({ user: null }),
}));
