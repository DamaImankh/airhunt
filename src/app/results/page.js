"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Results() {
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/search-flights?from=${from}&to=${to}&date=${date}`);
                const data = await res.json();
                setFlights(data.data);
            } catch (error) {
                console.error("Ошибка загрузки рейсов:", error);
            }
            setLoading(false);
        };
        if (from && to && date) {
            fetchFlights();
        }
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
                ) : flights.length > 0 ? (
                    flights.map((flight) => (
                        <div key={flight.flight_number} className="border rounded-lg p-4 mb-4">
                            <p className="text-gray-800 font-semibold">Рейс: {flight.airline} ({flight.flight_number})</p>
                            <p className="text-gray-700">Вылет: {flight.from} - {flight.to}</p>
                            <p className="text-gray-700">Дата: {flight.date}</p>
                            <p className="text-gray-700 mb-4">Цена: от ${flight.price}</p>
                            <Link 
                                href={`/checkout?from=${from}&to=${to}&date=${date}`}
                                className="block text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Забронировать
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-black">Рейсы не найдены.</p>
                )}
            </div>
        </main>
    );
}
