"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchBookings(currentUser.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const q = query(collection(db, "bookings"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const userBookings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(userBookings);
    } catch (error) {
      console.error("Ошибка загрузки бронирований:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "bookings", bookingToDelete.id));
      setBookings((prev) => prev.filter((b) => b.id !== bookingToDelete.id));
      setBookingToDelete(null);
    } catch (error) {
      console.error("Ошибка при удалении бронирования:", error);
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>Загрузка...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="mb-4">Войдите, чтобы просмотреть ваши бронирования.</p>
        <Link
          href="/login"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Войти
        </Link>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Мои бронирования ✈️</h1>

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow p-4 mb-4 w-full max-w-md">
            <p className="text-gray-900 font-semibold">Рейс: {booking.from} → {booking.to}</p>
            <p className="text-gray-700">Дата: {booking.date}</p>
            <p className="text-gray-700">Имя: {booking.name}</p>
            <p className="text-gray-700 mb-2">Email: {booking.email}</p>
            <button
              onClick={() => setBookingToDelete(booking)}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
            >
              Отменить бронирование
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-700">У вас пока нет бронирований.</p>
      )}

      <Link
        href="/"
        className="mt-6 bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
      >
        На главную
      </Link>

      {/* 🪟 Модальное окно подтверждения */}
      {bookingToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Подтверждение</h2>
            <p className="text-gray-800 mb-4">
              Вы уверены, что хотите отменить рейс <strong>{bookingToDelete.from} → {bookingToDelete.to}</strong> на дату <strong>{bookingToDelete.date}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setBookingToDelete(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
