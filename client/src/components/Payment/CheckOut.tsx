import { useState } from "react";
import { loadStripe, StripeError } from "@stripe/stripe-js";
import { string } from "yup";
import axios from "axios";
import { getPaymentApi } from "@lib/api/allApi";

const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

type Stripe = import("@stripe/stripe-js").Stripe;

const stripePromise: Promise<Stripe | null> = publicKey
  ? loadStripe(publicKey)
  : Promise.resolve(null);

function CheckOut({ totalPrice, tutorId, bookingId, bookingStatus }: { totalPrice: number, tutorId: number, bookingId: number, bookingStatus: string }) {

  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    const isConfirmed = window.confirm('Once Payment done than its not refundale. So are you sure?');
    if (isConfirmed) {

      try {
        const payment = await getPaymentApi({ 'price': totalPrice, 'tutor_id': tutorId, 'booking_id': bookingId })

        const data = payment.data;
        const stripe = await stripePromise;

        if (!stripe) {
          throw new Error("Stripe.js has not loaded yet");
        }

        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (stripeError) {
          window.location.href = "http://localhost:3000/payment/fails"
          throw new Error(stripeError.message);
        }
      } catch (error: any) {
        setError(error.message);
        window.location.href = "http://localhost:3000/payment/fails";
      }
    }
  };


  return (
    <div>
      {totalPrice !== 0 && (
        <button
          className="rounded"
          style={{
            backgroundColor: '#778899', color: 'white',
            cursor: bookingStatus === 'Paid' ? 'not-allowed' : 'pointer',
            filter: bookingStatus === 'Paid' ? 'blur(0.5px)' : 'none',
          }}
          onClick={handleCheckout}
          disabled={bookingStatus == 'Paid'}
        >
          {totalPrice}
        </button>
      )}
    </div>
  );
}

export default CheckOut;
