import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { UserDataContext } from "../contexts/UserContext";
import { ErrorNotification } from "../components/ErrorNotification";
import { Loader2 } from "lucide-react";
import Seo from "../components/Seo";

const Signup = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    rolle: "Frontend Developer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleFromSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const userData = {
      fullname: { firstname: form.firstname, lastname: form.lastname },
      email: form.email,
      password: form.password,
      rolle: form.rolle,
    };

    try {
      const res = await API.post("/api/auth/register", userData);
      if (res.status === 201) {
        const data = res.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setuser(data.user);
        navigate("/genAi");
      } else if (res.status === 409) {
        setError("⚠️ User already exists");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <Seo
        title={"Sign Up – GenAi"}
        description={
          "Create your GenAi account and start generating AI-powered React components instantly."
        }
        url={import.meta.env.WEBSITE_URL}
      />
      <div className="flex min-h-screen max-h-full bg-gray-950 text-white">
        {/* Left Side - Signup Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12">
          <div className="max-w-md w-full bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-2xl shadow-2xl border border-gray-800 space-y-3">
            {/* Logo / Heading */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                GenAI
              </h1>
              <p className="text-gray-400 text-sm">
                Create your account and start building smarter ⚡
              </p>
            </div>

            {/* Error Message */}
            <ErrorNotification error={error} clearError={() => setError("")} />

            {/* Signup Form */}
            <form onSubmit={handleFromSubmit} className="space-y-5 h-[90%]">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div>
                  <label className="block text-xs mb-1 text-gray-400">
                    First Name
                  </label>
                  <input
                    value={form.firstname}
                    onChange={handleChange}
                    type="text"
                    name="firstname"
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-400">
                    Last Name
                  </label>
                  <input
                    value={form.lastname}
                    onChange={handleChange}
                    type="text"
                    name="lastname"
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-400">Role</label>
                <select
                  value={form.rolle}
                  name="rolle"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                  <option value="Backend Developer">Backend Developer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium shadow-md flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
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

        {/* Right Side - Illustration */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000"
            alt="AI Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/30 to-transparent" />
        </div>
      </div>
    </>
  );
};

export default Signup;
