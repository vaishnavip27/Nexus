import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
    } catch (error) {
      console.log(error);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
