import { create } from "zustand";

interface UnreadState {
  isUnread: boolean;
  setIsUnread: (isUnread: boolean) => void;
}

export const useUnreadStore = create<UnreadState>((set) => ({
  isUnread: false,
  setIsUnread: (isUnread) => set({ isUnread }),
}));
