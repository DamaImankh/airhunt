"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Results() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-4">
            <h1 className="text-4xl font-bold text-white mb-6">Результаты поиска ✈️</h1>
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                <p className="text-gray-900 mb-2"><strong>Откуда:</strong> {from}</p>
                <p className="text-gray-900 mb-2"><strong>Куда:</strong> {to}</p>
                <p className="text-gray-900 mb-4"><strong>Дата вылета:</strong> {date}</p>

                {/* Пример карточки рейса */}
                <div className="border rounded-lg p-4 mb-4">
                    <p className="text-gray-800 font-semibold">Рейс: AirHunt Airlines</p>
                    <p className="text-gray-700">Вылет: {from} - {to}</p>
                    <p className="text-gray-700">Дата: {date}</p>
                    <p className="text-gray-700 mb-4">Цена: от $150</p>
                    
                    {/* Кнопка бронирования через Link */}
                    <Link 
                        href={`/checkout?from=${from}&to=${to}&date=${date}`}
                        className="block text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Забронировать
                    </Link>
                </div>
            </div>
        </main>
    );
}
