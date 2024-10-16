import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();

    const cancelIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    return NextResponse.json({ success: true, paymentIntent: cancelIntent });
  } catch (error) {
    console.error("Cancel Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `예약 거절 중 오류가 발생했습니다: ${error}` },
      { status: 500 }
    );
  }
}
