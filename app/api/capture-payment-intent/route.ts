import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log(paymentIntent);
    if (paymentIntent.status !== "requires_capture") {
      throw new Error("결제를 캡처할 수 없는 상태입니다.");
    }

    const capturedIntent = await stripe.paymentIntents.capture(paymentIntentId);

    return NextResponse.json({ success: true, paymentIntent: capturedIntent });
  } catch (error) {
    console.error("Capture Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `결제 확정 중 오류가 발생했습니다: ${error}` },
      { status: 500 }
    );
  }
}
