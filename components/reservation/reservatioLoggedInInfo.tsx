"use client";

import CheckoutForm from "@/components/reservation/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
  }
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const appearance = {
    variables: {
      colorPrimary: "#f97215",
    },
  };

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount,
          currency: "krw",
          appearance,
        }}
      >
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
      </Elements>
    </div>
  );
}
