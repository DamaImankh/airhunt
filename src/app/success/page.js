"use client";
import Link from "next/link";

export default function Success() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-4">
      <h1 className="text-4xl font-bold text-green-800 mb-4">🎉 Бронирование подтверждено!</h1>
      <p className="text-green-900 mb-6">Ваше бронирование успешно сохранено и подтверждение отправлено на email.</p>
      
      <Link 
        href="/profile"
        className="mb-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Мои бронирования
      </Link>
      
      <Link 
        href="/"
        className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
      >
        На главную
      </Link>
    </main>
  );
}
