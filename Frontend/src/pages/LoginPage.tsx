import { useState } from "react";
import { login } from "../services/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      alert(`Welcome ${res.data.username}`);
      // bisa redirect ke dashboard
      window.location.href = "/dashboard";
    } catch {
      alert("Login gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">
      <div className="w-[380px] rounded-2xl bg-white/80 backdrop-blur-xl
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-white/40 px-8 py-10">

        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Login
        </h1>

        <input
          className="w-full rounded-lg bg-white/70 border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 mb-4"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded-lg bg-white/70 border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 mb-6"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-white font-medium hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <a href="/register" className="ml-1 text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
