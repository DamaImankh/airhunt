// airhunt/app/api/search-flights/route.js
import { NextResponse } from "next/server";
import { mockFlights } from "../../../data/mockFlights";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  const filteredFlights = mockFlights.filter(
    (flight) =>
      flight.from.toLowerCase() === from?.toLowerCase() &&
      flight.to.toLowerCase() === to?.toLowerCase() &&
      flight.date === date
  );

  return NextResponse.json({ flights: filteredFlights });
}
