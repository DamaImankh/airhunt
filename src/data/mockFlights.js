// airhunt/data/mockFlights.js
const cities = ["Almaty", "Astana", "Dubai", "Istanbul", "Frankfurt", "London", "Paris", "New York", "Tokyo", "Seoul"];
const airlines = ["AirHunt Airlines", "Kazakhstan Air", "SkyExpress", "Global Wings", "Nomad Air"];

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString().split('T')[0];
}

function getRandomPrice() {
  return (100 + Math.floor(Math.random() * 500)).toFixed(0); // от $100 до $600
}

export const mockFlights = [];

const today = new Date();
const oneYearLater = new Date(today);
oneYearLater.setFullYear(today.getFullYear() + 1);

for (let i = 0; i < 200; i++) {
  const from = cities[Math.floor(Math.random() * cities.length)];
  let to;
  do {
    to = cities[Math.floor(Math.random() * cities.length)];
  } while (to === from); // чтобы from != to

  mockFlights.push({
    id: i + 1,
    airline: airlines[Math.floor(Math.random() * airlines.length)],
    from,
    to,
    date: getRandomDate(today, oneYearLater),
    price: getRandomPrice(),
  });
}
