"use client";
import Link from "next/link";

export default function Routes() {
  // Для примера — список популярных маршрутов
  const popularRoutes = [
    { from: "Алматы", to: "Стамбул", price: "$250", date: "2025-08-10" },
    { from: "Алматы", to: "Дубай", price: "$300", date: "2025-08-12" },
    { from: "Алматы", to: "Бангкок", price: "$350", date: "2025-08-15" },
    { from: "Алматы", to: "Париж", price: "$450", date: "2025-08-20" },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-gray-300 p-4">
      <h1 className="text-4xl font-bold text-black mb-6">Популярные маршруты ✈️</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {popularRoutes.map((route, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-lg text-center">
            <p className="text-gray-900 font-semibold mb-2">{route.from} → {route.to}</p>
            <p className="text-gray-700 mb-1">Дата: {route.date}</p>
            <p className="text-gray-700 mb-4">Цена: {route.price}</p>
            <Link
              href={`/checkout?from=${route.from}&to=${route.to}&date=${route.date}`}
              className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Забронировать
            </Link>
          </div>
        ))}
      </div>
      <Link 
        href="/" 
        className="block text-center mt-6 text-gray-200 hover:underline"
      >
        ⬅ Вернуться на главную
      </Link>
    </main>
  );
}
