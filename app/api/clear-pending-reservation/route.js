import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookiesStore = await cookies();
  cookiesStore.delete("pending_reservation");
  cookiesStore.delete("payment_id");

  const cookiesInfos = cookiesStore.get("pending_reservation");

  return NextResponse.json({
    status: "success",
    message: "pending reservation is cleared",
    data: { cookiesInfos },
  });
}
