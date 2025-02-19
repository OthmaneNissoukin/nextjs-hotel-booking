import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { cookies, headers } from "next/headers";
import { getRoomById } from "@/app/_lib/supabase/rooms";
import { daysDifferCount } from "@/app/utils/datetime";
import {
  bookingTotalPrice,
  nightTotalPrice,
} from "@/app/utils/reservationsCalcs";
import { format } from "date-fns";

import jwt from "jsonwebtoken";
import { getGuestByEmail } from "@/app/_lib/supabase/guests";

export async function POST(req, res) {
  const headersList = headers();
  const requestBody = await req.json();

  // PREVENT MALICIOUS ACCESS

  const bearerToken = headersList.get("Authorization");
  // console.log({ bearerToken });

  if (!bearerToken?.length) {
    return NextResponse.json(
      {
        status: "forbidden",
        message: "you are unauthorized to access this resource",
      },
      { status: 403 }
    );
  }

  const supabaseAccessToken = bearerToken.split(" ").at(1);

  let guest_email = "";

  try {
    const verify = jwt.verify(
      supabaseAccessToken,
      process.env.SUPABASE_JWT_SECRET
    );
    guest_email = verify.email;
    // console.log({
    //   verify,
    //   data: verify ? jwt.decode(supabaseAccessToken) : null,
    // });
  } catch (err) {
    return NextResponse.json(
      {
        status: "unauthenticated",
        message: err?.message ?? "you are unauthorized to access this resource",
      },
      { status: 401 }
    );
  }

  const cookiesInstance = cookies();

  if (!requestBody?.pending_reservation)
    return NextResponse.json(
      {
        status: "error",
        message:
          "you are unauthorized to access this resource! please make a booking from the rooms page.",
      },
      { status: 403 }
    );

  const pending_reservation = requestBody.pending_reservation;

  const [guest, room] = await Promise.all([
    getGuestByEmail(guest_email),
    getRoomById(pending_reservation?.room_id),
  ]);

  if (!guest?.id) {
    return NextResponse.json(
      {
        status: "forbidden",
        message: "you are unauthorized to perform this operation.",
      },
      { status: 403 }
    );
  }

  if (!room?.id) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "room doesn't exists! please make a booking from the rooms page.",
      },
      { status: 422 }
    );
  }

  const totalNights = daysDifferCount(
    pending_reservation.end_date,
    pending_reservation.start_date
  );
  const totalUSDPrice = bookingTotalPrice(
    room.price,
    pending_reservation.guests_count,
    totalNights
  );
  const totalCentPrice = totalUSDPrice * 100;

  // const data = await req;
  // console.log({ METHOD: req.method, data: data, pending_reservation });
  // console.log({ body: req.body, bodyPrice: req.body.priceId });

  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // price: data.priceId, // THIS IS USEFULL WHEN HAVING PRODUCTS IN STRIP DASHBOARD
            quantity: 1,
            price_data: {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              currency: "usd",
              unit_amount: totalCentPrice,
              product_data: {
                name: room.name,
                description: `Booking ${room.name} for ${
                  pending_reservation.guests_count
                } guest(s). Starting from ${format(
                  pending_reservation.start_date,
                  "LLLL dd yyyy"
                )} until ${format(
                  pending_reservation.end_date,
                  "LLLL do yyyy"
                )} : (${totalNights}) Nights`,
                images: [
                  `https://kapumuyablpuibhumzdj.supabase.co/storage/v1/object/public/rooms-imgs/${room.thumbnail}`,
                ],
              },
            },
          },
        ],
        mode: "payment",
        expires_at: Math.floor(Date.now() / 1000) + 3600 * 2, // EXPIRE IN 2 HOURS FROM CREATION TIME
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/reservations/checkout`,
      });
      // console.log({ session });
      const updated_session = await stripe.checkout.sessions.update(
        session.id,
        {
          metadata: {
            payload: JSON.stringify({
              session_id: session.id,
              pending_reservation,
              guest_id: guest.id,
              session_id: session.id,
              supabaseAccessToken,
            }),
          },
        }
      );

      console.log("NO ERROR");

      cookiesInstance.set("payment_id", session.id);

      return NextResponse.json(
        {
          status: "success",
          session_id: session.id,
          checkout_url: session.url,
        },
        { status: 200 }
      );
      // return req.redirect(303, session.url);
      // return NextResponse.redirect(new URL(session.url));
    } catch (err) {
      console.log("!!!!!!!!! ERROR !!!!!!!!!!!");
      console.log({ ERROR: err?.message ?? err });
      return NextResponse.json({ error: err?.message }, { status: 500 });
    }
  } else {
    NextResponse.setHeader("Allow", ["POST"]);
    return NextResponse.status(405).end("Method Not Allowed");
  }
}
