"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Payment() {
    const router = useRouter();
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            router.push("/success"); // переход на страницу успеха
        }, 2000); // имитация запроса
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 p-4">
            <h1 className="text-3xl font-bold text-black mb-6">Оплата</h1>
            <form 
                onSubmit={handlePayment} 
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <input
                    type="text"
                    placeholder="Имя на карте"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border rounded-lg outline-none text-black"
                    required
                />
                <input
                    type="text"
                    placeholder="Номер карты"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-3 border rounded-lg outline-none text-black"
                    required
                />
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-1/2 p-3 border rounded-lg outline-none text-black"
                        required
                    />
                    <input
                        type="text"
                        placeholder="CVC"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-1/2 p-3 border rounded-lg outline-none text-black"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Оплата..." : "Оплатить"}
                </button>
            </form>
        </main>
    );
}
