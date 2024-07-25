import { create } from "zustand";

export const useChatStore = create((set) => ({
  chatId: null,
  selectedUser: null,
  changeChat: (chatId, user) => set({ chatId, user, selectedUser: user }),
}));
