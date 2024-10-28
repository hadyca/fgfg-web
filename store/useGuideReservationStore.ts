import { create } from "zustand";

interface User {
  avatar: string;
  username: string;
}

interface Reservation {
  id: number;
  user: User;
  startTime: string;
  endTime: string;
  guideConfirm: boolean;
  userCancel: boolean;
  guideCancel: boolean;
  createdAt: string;
  serviceFee: number;
  customerAgeRange: string;
  status?: string;
}

interface ReservationState {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  reservationList: Reservation[];
  setReservationList: (reservations: Reservation[]) => void;
  setConfirm: (id: number) => void;
  setReject: (id: number) => void;
}

export const useGuideReservationStore = create<ReservationState>((set) => ({
  selectedTab: "upcoming",
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  reservationList: [],
  setReservationList: (reservations) => set({ reservationList: reservations }),
  setConfirm: (id) =>
    set((state) => ({
      reservationList: state.reservationList.map((reservation) =>
        reservation.id === id
          ? { ...reservation, guideConfirm: true, status: "completed" }
          : reservation
      ),
    })),
  setReject: (id) =>
    set((state) => ({
      reservationList: state.reservationList.map((reservation) =>
        reservation.id === id
          ? { ...reservation, guideCancel: true, status: "cancelled" }
          : reservation
      ),
    })),
}));
