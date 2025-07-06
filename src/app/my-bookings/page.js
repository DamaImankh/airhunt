"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function MyBookings() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const q = query(
                    collection(db, "bookings"),
                    where("userId", "==", currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBookings(data);
            } else {
                router.push("/login");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Загрузка...</p>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-300 p-4">
            <h1 className="text-4xl font-bold text-black mb-6">Мои бронирования ✈️</h1>
            {bookings.length === 0 ? (
                <p className="text-gray-700">У вас пока нет бронирований.</p>
            ) : (
                <div className="w-full max-w-md space-y-4">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-900"><strong>Откуда:</strong> {booking.from}</p>
                            <p className="text-gray-900"><strong>Куда:</strong> {booking.to}</p>
                            <p className="text-gray-900"><strong>Дата:</strong> {booking.date}</p>
                            <p className="text-gray-900"><strong>Имя:</strong> {booking.name}</p>
                            <p className="text-gray-900"><strong>Email:</strong> {booking.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
