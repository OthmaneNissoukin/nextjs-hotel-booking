import { riskySupabaseClient } from "@/app/_lib/supabase/supabaseRiskyClient";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ").at(1);

  if (!jwt.verify(token, process.env.SUPABASE_JWT_SECRET)) {
    NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const tokenPayload = jwt.decode(token);

  if (!["anon", "authenticated"].includes(tokenPayload.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const email = req.nextUrl.searchParams.get("email");
  const id = req.nextUrl.searchParams.get("id");
  const select = req.nextUrl.searchParams.get("select") || "*";

  let query = riskySupabaseClient.from("guests_view").select(select);

  if (email) query = query.eq("email", email);
  if (id) query = query.eq("id", id);

  if (email || id) query = query.single();

  let { data: guests, error } = await query;

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    return NextResponse.json({
      status: "error",
      message: error.message,
      error: error,
    });
  }

  return NextResponse.json({
    status: "success",
    count: guests.length,
    data: guests,
  });
}
