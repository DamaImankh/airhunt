// src/services/flights.js

export async function searchFlights(from, to, date) {
    // Здесь пока возвращаем мок-данные (можно заменить на реальный API)
    return [
      {
        airline: "AirHunt Airlines",
        flight_number: "AH123",
        price: 150,
        from,
        to,
        from_city: from,
        to_city: to,
        date
      },
      {
        airline: "KazAir",
        flight_number: "KA456",
        price: 180,
        from,
        to,
        from_city: from,
        to_city: to,
        date
      }
    ];
  }
  