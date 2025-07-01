"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push("/login");
            } else {
                setUser(currentUser);
                await fetchBookings(currentUser.uid);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

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

    if (loading) return <div className="text-center text-white mt-20 text-xl">Загрузка...</div>;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-gray-300 p-4">
            <h1 className="text-4xl font-bold text-white mb-6">Профиль</h1>
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
                <p className="text-gray-900 text-lg"><strong>Вы вошли как:</strong> {user?.email}</p>

                <h2 className="text-2xl font-semibold text-black mt-6">Ваши бронирования</h2>
                {bookings.length === 0 ? (
                    <p className="text-black mt-4">Нет бронирований</p>
                ) : (
                    <ul className="mt-4">
                        {bookings.map((booking) => (
                            <li key={booking.id} className="border p-4 rounded-lg mb-2 bg-gray-100">
                                <p className="text-black"><strong>Откуда:</strong> {booking.from}</p>
                                <p className="text-black"><strong>Куда:</strong> {booking.to}</p>
                                <p className="text-black"><strong>Дата:</strong> {booking.date}</p>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    onClick={() => {
                        signOut(auth);
                        router.push("/login");
                    }}
                    className="mt-6 bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition"
                >
                    Выйти
                </button>
            </div>
        </main>
    );
}
