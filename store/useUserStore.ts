import { create } from "zustand";

interface Guide {
  id: number;
  fullname: string;
  isApproved: string;
}

interface Users {
  id: number;
}

interface ChatRooms {
  id: string;
  otherUserId: number;
  users: Users[];
}

interface User {
  id: number;
  username: string;
  avatar: string;
  email: string;
  guide: Guide;
  chatRooms: ChatRooms[];
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
