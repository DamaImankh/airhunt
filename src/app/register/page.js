"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Регистрация успешна!");
      router.push("/profile");
    } catch (error) {
      setMessage("Ошибка регистрации: " + error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-300 p-4">
      <h1 className="text-3xl font-bold text-black mb-4">Регистрация</h1>

      <form onSubmit={handleRegister} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
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
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
        >
          Зарегистрироваться
        </button>
        {message && <p className="mt-4 text-center text-black">{message}</p>}

        <p className="mt-4 text-center text-black">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">Войти</Link>
        </p>
      </form>
    </main>
  );
}
