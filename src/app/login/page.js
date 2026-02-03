"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo"); // куда перенаправить после входа

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Успешный вход!");
      router.push(redirectTo || "/profile");
    } catch (error) {
      setMessage("Ошибка входа: " + error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-300 p-4">
      <h1 className="text-3xl font-bold text-black mb-4">Вход в аккаунт</h1>

      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
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
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Войти
        </button>
        {message && <p className="mt-4 text-center text-black">{message}</p>}

        <p className="mt-4 text-center text-black">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">Зарегистрироваться</Link>
        </p>
      </form>
    </main>
  );
}
