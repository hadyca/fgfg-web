"use client";

import CheckoutForm from "@/components/reservation/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Spinner from "../ui/spinner";
import { GetReservationSkeletonBottom } from "@/app/(main)/reservation/[guideId]/skeleton";

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
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
  }
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentIntentId(data.paymentIntentId);
        setClientSecret(data.clientSecret);
      });
  }, [amount]);

  const appearance = {
    variables: {
      colorPrimary: "#f97215",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
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
            paymentIntentId={paymentIntentId}
            clientSecret={clientSecret}
          />
        </Elements>
      ) : (
        <GetReservationSkeletonBottom />
      )}
    </div>
  );
}
