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
  pickupPlaceMain: string;
  pickupPlaceDetail: string;
  status?: string;
}

interface ReservationState {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  reservations: Reservation[];
  setReservations: (reservations: Reservation[]) => void;
  setConfirm: (id: number) => void;
  setReject: (id: number) => void;
  countPendingReservations: number;
  setCountPendingReservations: (reservations: Reservation[]) => void;
}

export const useGuideReservationStore = create<ReservationState>((set) => ({
  selectedTab: "upcoming",
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  reservations: [],
  setReservations: (reservations) => set({ reservations: reservations }),
  setConfirm: (id) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, guideConfirm: true }
          : reservation
      ),
      countPendingReservations: state.countPendingReservations - 1,
    })),
  setReject: (id) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, guideCancel: true, status: "cancelled" }
          : reservation
      ),
      countPendingReservations: state.countPendingReservations - 1,
    })),
  countPendingReservations: 0,
  setCountPendingReservations: (reservations) =>
    set({
      countPendingReservations: reservations.filter(
        (reservation) =>
          reservation.status === "upcoming" && !reservation.guideConfirm
      ).length,
    }),
}));
