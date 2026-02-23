import { useState } from "react";
import { UserService } from "../services/user_service";
import { useNavigate } from "react-router-dom";

const userService = new UserService();

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      const res = await userService.login(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", res.email);
      localStorage.setItem("role", res.role);

      alert(`Welcome ${res.email}`);

      // React Router navigation
      if (res.role === "Admin") {
        navigate("/dashboard/admin");
      } else if (res.role === "User") {
        navigate("/dashboard/user");
      } else {
        navigate("/login");
      }
    } catch (err: any) {
      alert("Login gagal: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="w-[380px] rounded-2xl bg-gradient-to-b from-[#111118] to-[#0d0d14]
                      backdrop-blur-md shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]
                      border border-[#22222b] px-8 py-10">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#1c1c28] border border-[#33334a]
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-[#1c1c28] border border-[#33334a]
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500
                     text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
