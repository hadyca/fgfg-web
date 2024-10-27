"use client";

import CheckoutForm from "@/components/reservation/checkoutForm";

interface ReservationLoggedInInfoProps {
  isMe: boolean;
  amount: number;
  guideId: number;
  userId: number;
  username: string;
  avatar: string;
  email: string;
  startTime: string;
  endTime: string;
}

export default function ReservationLoggedInInfo({
  isMe,
  amount,
  guideId,
  userId,
  username,
  avatar,
  email,
  startTime,
  endTime,
}: ReservationLoggedInInfoProps) {
  return (
    <CheckoutForm
      amount={amount}
      isMe={isMe}
      guideId={guideId}
      userId={userId}
      username={username}
      avatar={avatar}
      email={email}
      startTime={startTime}
      endTime={endTime}
    />
  );
}
