import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { UserDataContext } from "../contexts/UserContext";
import { AlertCircle } from "lucide-react";
import { ErrorNotification } from "../components/ErrorNotification";

const Signup = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleFromSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      fullname: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
      email: form.email,
      password: form.password,
    };

    try {
      const res = await API.post("/api/auth/register", userData);
      if (res.status === 201) {
        const data = res.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        setuser(data.user);
        navigate("/genAi");
      }
      if (res.status === 409) {
        setError("⚠️ User already exists");
      }
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setError(error.response.data.message || "Network error");
      console.error("signup error:", error.message);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="flex h-screen relative bg-gray-950 text-white">
      {/* Left Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 space-y-8">
          {/* Logo / Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-indigo-500">
              🚀 GenAI
            </h1>
            <p className="text-gray-400 mt-2">
              Create your account and start building smarter
            </p>
          </div>

          {/* Error Message */}
          <ErrorNotification error={error} clearError={() => setError("")} />

          {/* Signup Form */}
          <form onSubmit={handleFromSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  First Name
                </label>
                <input
                  value={form.firstname}
                  onChange={handleChange}
                  type="text"
                  name="firstname"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Last Name
                </label>
                <input
                  value={form.lastname}
                  onChange={handleChange}
                  type="text"
                  name="lastname"
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">Email</label>
              <input
                type="email"
                value={form.email}
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium shadow-md"
            >
              Sign Up
            </button>
          </form>

          {/* Extra Links */}
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000"
          alt="AI Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
