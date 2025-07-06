"use client";

import Link from "next/link";

export default function Success() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-green-500 p-4">
            <h1 className="text-4xl font-bold text-white mb-6">✅ Бронирование успешно!</h1>
            <p className="text-white mb-8 text-lg">Ваше бронирование было успешно сохранено.</p>

            <Link
                href="/"
                className="bg-white text-green-700 font-semibold py-3 px-6 rounded-lg hover:bg-green-100 transition mb-4"
            >
                На главную
            </Link>
            <Link
                href="/profile"
                className="bg-white text-green-700 font-semibold py-3 px-6 rounded-lg hover:bg-green-100 transition"
            >
                Перейти в профиль
            </Link>
        </main>
    );
}
