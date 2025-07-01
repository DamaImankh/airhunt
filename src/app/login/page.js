"use client";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const redirectTo = searchParams.get("redirectTo");

    // Store redirect path only if it's set
    useEffect(() => {
        if (redirectTo) {
            localStorage.setItem("redirectTo", redirectTo);
        }
    }, [redirectTo]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            // Get saved redirect route or default to profile
            const destination = localStorage.getItem("redirectTo") || "/profile";
            localStorage.removeItem("redirectTo"); // Clean up storage
            router.push(destination);
        } catch (error) {
            setError("Ошибка входа: " + error.message);
        }

        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            const destination = localStorage.getItem("redirectTo") || "/profile";
            localStorage.removeItem("redirectTo");
            router.push(destination);
        } catch (error) {
            setError("Ошибка входа через Google: " + error.message);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-300 p-4">
            <h1 className="text-4xl font-bold text-black mb-6">Вход в систему</h1>

            <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-3 border rounded-lg outline-none text-black"
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-3 border rounded-lg outline-none text-black"
                    required
                />

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition mb-3"
                    disabled={loading}
                >
                    {loading ? "Вход..." : "Войти"}
                </button>

                <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition mb-4"
                >
                    Войти через Google
                </button>

                <p className="text-center text-gray-600">
                    Нет аккаунта? <a href="/register" className="text-blue-500 hover:underline">Зарегистрироваться</a>
                </p>
            </form>

            {/* Back Button Logic */}
            <button 
                onClick={() => {
                    if (document.referrer && !document.referrer.includes(window.location.origin)) {
                        window.location.href = "/";
                    } else if (window.history.length > 1) {
                        router.back();
                    } else {
                        router.push("/");
                    }
                }} 
                className="mt-4 text-gray-700 hover:text-blue-600 underline"
            >
                ⬅ Вернуться назад
            </button>
        </main>
    );
}
