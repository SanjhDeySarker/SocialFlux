import { useState } from "react";
import { loginUser } from "../api/backend";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.access_token);
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Sign in
        </button>
      </form>
    </div>
  );
}
