"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // правильный импорт для App Router
import { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from "react-icons/fa";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    // Переход на страницу с параметрами
    router.push(`/results?from=${from}&to=${to}&date=${date}`);
  };

  return ( 
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-4">
<Link 
  href="/login" 
  className="absolute top-5 right-5 bg-white text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
  Войти
</Link>
      {/* Заголовок */}
      <h1 className="text-5xl font-extrabold text-white">AirHunt ✈️</h1>

      {/* Блок с поисковой строкой */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mt-8">
        {/* Откуда */}
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          Откуда?
        </label>
        <div className="flex items-center border rounded-lg p-3"> 
          <FaPlaneDeparture className="text-gray-500 mr-3" />
          <input 
            type="text"
            placeholder="Город отправления"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full outline-none text-gray-900 placeholder:text-gray-400 p-2"
          />
        </div>

        {/* Куда */}
        <label className="block text-gray-700 text-lg font-semibold mt-4 mb-2">
          Куда?
        </label>
        <div className="flex items-center border rounded-lg p-3">
          <FaPlaneArrival className="text-gray-500 mr-3" />
          <input 
            type="text"
            placeholder="Город назначения"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full outline-none text-gray-900 placeholder:text-gray-400 p-2"
          />
        </div>

        {/* Дата вылета */}
        <label className="block text-gray-700 text-lg font-semibold mt-4 mb-2"> 
          Дата вылета
        </label>
        <div className="flex items-center border rounded-lg p-3">
          <FaCalendarAlt className="text-gray-500 mr-3" />
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full outline-none text-gray-900 placeholder:text-gray-400 p-2"
          />
        </div>

        {/* Кнопка поиска */}
        <button 
          onClick={handleSearch}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
          Найти билеты
        </button>
      </div>
    </main>
  );
}
