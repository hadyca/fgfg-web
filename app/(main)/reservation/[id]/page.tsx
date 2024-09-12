interface ReservationProps {
  params: {
    id: string;
  };
  searchParams?: {
    starttime: string;
    endtime: string;
  };
}

export default function Reservation(props: ReservationProps) {
  return <h1>예약 결제 페이지</h1>;
}
