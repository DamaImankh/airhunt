"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoutesPage() {
  const router = useRouter();

  const popularRoutes = [
    { from: "Алматы", to: "Париж", date: "2025-07-25" },
    { from: "Астана", to: "Бангкок", date: "2025-07-30" },
    { from: "Шымкент", to: "Нью-Йорк", date: "2025-08-10" },
    { from: "Алматы", to: "Лондон", date: "2025-08-20" },
  ];

  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(stored);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Популярные маршруты ✈️</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-gray-700 mb-2 font-semibold">Выберите маршрут:</h2>
        <div className="flex flex-col space-y-2">
          {popularRoutes.map((route, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/results?from=${route.from}&to=${route.to}&date=${route.date}`)}
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              ✈️ {route.from} → {route.to} ({route.date})
            </button>
          ))}
        </div>

        {/* Последние поиски, фильтруем только корректные */}
        {recentSearches.filter(s => s.from && s.to && s.date).length > 0 && (
          <>
            <h2 className="text-gray-700 mt-6 mb-2 font-semibold">Последние поиски:</h2>
            <div className="flex flex-col space-y-2">
              {recentSearches
                .filter(s => s.from && s.to && s.date)
                .map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => router.push(`/results?from=${search.from}&to=${search.to}&date=${search.date}`)}
                    className="flex items-center justify-center bg-gray-100 text-black py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    🔍 {search.from} → {search.to} ({search.date})
                  </button>
                ))}
            </div>
          </>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
        >
          На главную
        </button>
      </div>
    </main>
  );
}
