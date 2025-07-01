"use client";
import Link from "next/link";

export default function Success() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-4">
            <h1 className="text-4xl font-bold text-white mb-6">Бронирование успешно ✅</h1>
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
                <p className="text-gray-800 mb-4">Спасибо за бронирование с AirHunt!</p>
                <Link
                href={"/"}
                className="block bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-lue-700 transition"
                >
                    Вернуться на главную
                </Link>
            </div>
        </main>
    );
};