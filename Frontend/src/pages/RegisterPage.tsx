import { useState } from "react";
import { register } from "../services/auth";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        try {
            await register(username, password);
            alert("Register sukses, silakan login");
            window.location.href = "/login";
        } catch {
            alert("Register gagal");
        }
    }

    return (
        <div className="min-h-screen bg-radial from-blue-900 to-gray-900 flex items-center justify-center bg-gray-100">
            <div className="bg-white/35 backdrop-blur-lg border border-white/70 ring ring-gray-900 p-8 rounded-xl shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">
                    Register
                </h1>

                <div className="flex flex-col space-y-1 text-gray-800 font-semibold">
                    <label htmlFor="email" className="mb-2">Email</label>
                    <input
                        className="w-full p-3 rounded-lg mb-4 input-class"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-1 text-gray-800 font-semibold">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full p-3 rounded-lg mb-6 input-class"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleRegister}
                    className="w-full py-3 rounded-lg bg-gradient-to-b from-gray-800 to-gray-700 border-t border-gray-500 ring ring-gray-800 text-white"
                >
                    Register
                </button>

                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-800">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
