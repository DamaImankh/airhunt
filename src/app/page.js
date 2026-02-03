"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from "react-icons/fa";
import cities from "../data/cities";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const router = useRouter();

 /* // Загрузка последних поисков из localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);
  */

  const handleSearch = () => {
    const search = { from, to, date };
    const updatedSearches = [search, ...recentSearches].slice(0, 5); // сохраняем последние 5
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

    router.push(`/results?from=${from}&to=${to}&date=${date}`);
  };

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    setFromSuggestions(
      cities.filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    setToSuggestions(
      cities.filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-4">
      <Link 
        href="/login" 
        className="absolute top-5 right-5 bg-white text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
        Войти
      </Link>

      <h1 className="text-5xl font-extrabold text-white">AirHunt ✈️</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mt-8">

        <label className="block text-gray-700 text-lg font-semibold mb-2">Откуда?</label>
        <div className="relative">
          <div className="flex items-center border rounded-lg p-3"> 
            <FaPlaneDeparture className="text-gray-500 mr-3" />
            <input 
              type="text"
              placeholder="Город отправления"
              value={from}
              onChange={handleFromChange}
              className="w-full outline-none text-black placeholder:text-gray-400 p-2"
            />
          </div>
          {fromSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 rounded-lg shadow">
              {fromSuggestions.map((city, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setFrom(city.name);
                    setFromSuggestions([]);
                  }}
                  className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <label className="block text-gray-700 text-lg font-semibold mt-4 mb-2">Куда?</label>
        <div className="relative">
          <div className="flex items-center border rounded-lg p-3">
            <FaPlaneArrival className="text-gray-500 mr-3" />
            <input 
              type="text"
              placeholder="Город назначения"
              value={to}
              onChange={handleToChange}
              className="w-full outline-none text-black placeholder:text-gray-400 p-2"
            />
          </div>
          {toSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 rounded-lg shadow">
              {toSuggestions.map((city, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setTo(city.name);
                    setToSuggestions([]);
                  }}
                  className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <label className="block text-gray-700 text-lg font-semibold mt-4 mb-2">Дата вылета</label>
        <div className="flex items-center border rounded-lg p-3">
          <FaCalendarAlt className="text-gray-500 mr-3" />
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full outline-none text-black placeholder:text-gray-400 p-2"
          />
        </div>

        <button 
          onClick={handleSearch}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
          Найти билеты
        </button>

        <Link 
          href="/routes" 
          className="block text-center mt-4 bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-400 transition">
          Популярные маршруты
        </Link>

        {/* Последние поиски */}

        {/* Последние поиски */}
        {recentSearches.length > 0 && (
          <>
            <h2 className="text-gray-700 mt-6 mb-2 font-semibold">Последние поиски:</h2>
            <div className="flex flex-col space-y-2">
              {recentSearches
                .filter(search => search.from && search.to && search.date) // 👈 фильтруем только корректные
                .map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => router.push(`/results?from=${search.from}&to=${search.to}&date=${search.date}`)}
                    className="bg-gray-100 text-black py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    {search.from} → {search.to} ({search.date})
                  </button>
                ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
