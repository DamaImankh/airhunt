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
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login");
    } catch (err) {
      setError("Ошибка регистрации: " + err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Регистрация</h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        {error && <p className="text-red-500">{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full text-black p-3 border rounded-lg mb-4"
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full text-black p-3 border rounded-lg mb-4"
        />
        <button 
          onClick={handleRegister} 
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
          Зарегистрироваться
        </button>
        <p className="text-center text-black mt-4">
          Уже есть аккаунт? <Link href="/login" className="text-blue-600">Войти</Link>
        </p>
      </div>
    </main>
  );
}
