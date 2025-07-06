"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import emailjs from "@emailjs/browser"

export default function Checkout() {
    const searchParams = useSearchParams();
    const router = useRouter(); // useRouter hook
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null); // initializing user state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Clean up the subscription
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
    
        try {
            if (!user) {
                setMessage("Войдите в систему перед бронированием!");
                setLoading(false);
                return;
            }
    
            // Сначала добавляем бронирование в Firestore
            await addDoc(collection(db, "bookings"), {
                userId: user.uid,
                name,
                email,
                from,
                to,
                date,
                createdAt: new Date()
            });
    
            // Затем отправляем email через EmailJS
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    name,
                    email,
                    from,
                    to,
                    date
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );
    
            setMessage("Бронирование успешно сохранено и подтверждение отправлено на email!");
            router.push("/success");
        } catch (error) {
            setMessage("Ошибка бронирования: " + error.message);
        }
    
        setLoading(false);
    };
    
    

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-300 p-4">
            <h1 className="text-4xl font-bold text-black mb-6">Оформление бронирования ✈️</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                <p className="text-gray-900 mb-2"><strong>Откуда:</strong> {from}</p>
                <p className="text-gray-900 mb-2"><strong>Куда:</strong> {to}</p>
                <p className="text-gray-900 mb-4"><strong>Дата вылета:</strong> {date}</p>

                <input 
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 p-3 border rounded-lg outline-none text-black"
                    required
                />
                <input 
                    type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-3 border rounded-lg outline-none text-black"
                    required
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Обработка..." : "Подтвердить бронирование"}
                </button>

                {/* Show login prompt if user is not authenticated */}
                {!user && (
                    <div className="mt-6 text-center">
                        <p className="text-black mb-2">Войдите в систему перед бронированием!</p>
                        <button
                            onClick={() => router.push("/login?redirectTo=checkout")} // Added query param to redirect back to checkout after login
                            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                            Войти
                        </button>
                    </div>
                )}

                {message && <p className="mt-4 text-center text-black">{message}</p>}
            </form>
        </main>
    );
}
