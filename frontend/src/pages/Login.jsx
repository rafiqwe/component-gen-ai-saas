import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { UserDataContext } from "../contexts/UserContext";
import { ErrorNotification } from "../components/ErrorNotification";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setuser } = useContext(UserDataContext);
  const navigete = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const useData = {
      email: email,
      password: password,
    };
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", useData);
      if (res.status === 200) {
        const data = res.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        setuser(data.user);
        navigete("/genAi");
      }
    } catch (error) {
      setError(error.response.data.message || "Network Error");
      console.log("login error:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md my-35  bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            ⚡ GenAI SaaS
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Login to your account and continue building 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 font-semibold shadow-lg hover:opacity-90 transition"
          >
            Login
          </motion.button>
        </form>

        {/* Error Notification */}
        <ErrorNotification error={error} clearError={() => setError("")} />
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Social Login */}
        {/* <div className="space-y-3">
          <button className="w-full py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 flex items-center justify-center gap-3 hover:bg-gray-700 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </button>
          <button className="w-full py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 flex items-center justify-center gap-3 hover:bg-gray-700 transition">
            <img
              src="https://www.svgrepo.com/show/475647/github-color.svg"
              className="w-5 h-5"
              alt="GitHub"
            />
            Continue with GitHub
          </button>
        </div> */}

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
