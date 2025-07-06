import flights from "../../../mock/mockFlights.json"

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");
  
    const filteredFlights = flights.filter(
        flight =>
            flight.from.toLowerCase() === from.toLocaleLowerCase() &&
            flight.to.toLocaleLowerCase() === to.toLocaleLowerCase() &&
            flight.date === date
    );
  
    return Response.json({ data: filteredFlights });
  }
  