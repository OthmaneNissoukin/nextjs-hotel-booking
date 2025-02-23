import { riskySupabaseClient } from "@/app/_lib/supabase/supabaseRiskyClient";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  if (!["anon", "authenticated"].includes(tokenPayload.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract and validate query parameters
  const email = req.nextUrl.searchParams.get("email");
  const id = req.nextUrl.searchParams.get("id");
  const select = req.nextUrl.searchParams.get("select") || "*";
  const or = req.nextUrl.searchParams.get("or") || "";
  const from = Number(req.nextUrl.searchParams.get("from"));
  const to = Number(req.nextUrl.searchParams.get("to"));
  const order = req.nextUrl.searchParams.get("order") === "asc" ? "asc" : "desc";

  if (id && !/^-?\d+$/.test(id)) {
    return NextResponse.json({ status: "error", message: "Invalid id format (Expected Big Int 8)" }, { status: 422 });
  }

  if ((!isNaN(from) && isNaN(to)) || (isNaN(from) && !isNaN(to))) {
    return NextResponse.json({ error: "Invalid range parameters" }, { status: 400 });
  }

  let query = riskySupabaseClient.from("guests_view").select(select);
  if (email) query = query.eq("email", email);
  if (id) query = query.eq("id", Number(id));
  if (or) query = query.or(or);
  if (!isNaN(from) && !isNaN(to)) query = query.range(from, to);
  if (order) query = query.order("id", order);
  if (email || id) query = query.single();

  let { data: guests, error } = await query;

  if (error?.details?.includes("0 rows")) {
    return NextResponse.json({ status: "not found", count: 0, guests: [] }, { status: 404 });
  } else if (error) {
    return NextResponse.json({ status: "error", message: error.message, error }, { status: 500 });
  }

  return NextResponse.json({
    status: "success",
    count: Array.isArray(guests) ? guests.length : 1,
    data: guests,
  });
}
