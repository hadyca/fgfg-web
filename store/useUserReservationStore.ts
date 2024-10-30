import { create } from "zustand";

interface MainGuidePhoto {
  fileUrl: string;
}

interface Guide {
  id: number;
  fullname: string;
  birthdate: string;
  mainGuidePhoto: MainGuidePhoto;
}

interface Reservation {
  id: number;
  guide: Guide;
  startTime: string;
  endTime: string;
  guideConfirm: boolean;
  userCancel: boolean;
  guideCancel: boolean;
  createdAt: string;
  serviceFee: number;
  pickupPlaceMain: string;
  pickupPlaceDetail: string;
  status?: string;
}

interface ReservationState {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  reservationList: Reservation[];
  setReservationList: (reservations: Reservation[]) => void;
  setCancel: (id: number) => void;
}

export const useUserReservationStore = create<ReservationState>((set) => ({
  selectedTab: "upcoming",
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  reservationList: [],
  setReservationList: (reservations) => set({ reservationList: reservations }),
  setCancel: (id) =>
    set((state) => ({
      reservationList: state.reservationList.map((reservation) =>
        reservation.id === id
          ? { ...reservation, userCancel: true, status: "cancelled" }
          : reservation
      ),
    })),
}));
