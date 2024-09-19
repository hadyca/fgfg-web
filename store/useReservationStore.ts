import { create } from "zustand";

interface ReservationState {
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  isValid: false,
  setIsValid: (isValid: boolean) => set({ isValid }),
}));
