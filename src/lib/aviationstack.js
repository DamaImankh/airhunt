export async function getFlights(from, to, date) {
    const apiKey = process.env.AVIATIONSTACK_API_KEY;
  
    const res = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${from}&arr_iata=${to}&flight_date=${date}`);
    
    if (!res.ok) {
      throw new Error('Ошибка запроса к API');
    }
  
    const data = await res.json();
    return data;
  }
  