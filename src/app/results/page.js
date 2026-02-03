"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchFlights } from "../../services/flights";

export default function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchFlights(from, to, date);
        setFlights(data);
      } catch (error) {
        console.error("Ошибка при загрузке рейсов:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [from, to, date]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Результаты поиска ✈️</h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <p className="text-gray-900 mb-2"><strong>Откуда:</strong> {from}</p>
        <p className="text-gray-900 mb-2"><strong>Куда:</strong> {to}</p>
        <p className="text-gray-900 mb-4"><strong>Дата вылета:</strong> {date}</p>

        {loading ? (
          <p className="text-center">Загрузка...</p>
        ) : flights && flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight.flight_number} className="border rounded-lg p-4 mb-4">
              <p className="text-gray-800 font-semibold">Рейс: {flight.airline} ({flight.flight_number})</p>
              <p className="text-black">Вылет: {flight.from_city} → {flight.to_city}</p>
              <p className="text-gray-700">Дата: {flight.date}</p>
              <p className="text-gray-700 mb-2">Цена: от ${flight.price}</p>
              <button
                onClick={() => router.push(
                  `/checkout?from=${flight.from}&to=${flight.to}&date=${flight.date}`
                )}
                className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Забронировать
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">Нет доступных рейсов</p>
        )}
      </div>

      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
      >
        ⬅ Вернуться назад
      </button>
    </main>
  );
}
