import { useContext, useState } from "react";
import { Switch } from "@headlessui/react";
import { Bell, Lock, User, Moon } from "lucide-react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserDataContext } from "../../contexts/UserContext";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const { user } = useContext(UserDataContext);

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    forceRelogin: false,
  });
  const [userDetails, setUserDetails] = useState({
    firstname: user?.fullname?.firstname,
    lastname: user?.fullname?.lastname,
    email: user?.email,
  });

  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/change-password", {
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
      });

      if (res.status === 200) {
        toast.success("✅ Password updated successfully!");
        if (changePassword.forceRelogin) {
          toast.info("Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
        setChangePassword({
          oldPassword: "",
          newPassword: "",
          forceRelogin: false,
        });
      }
    } catch (error) {
      toast.error(
        `❌ Failed to update: ${
          error.response?.data?.message || error.message || "Network error"
        }`
      );
    }
  };

  const handleChange = (e) =>
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value });

  const handleUserDetailsChange = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">⚙️ Settings</h1>
          <p className="text-gray-400 mt-2">
            Manage your account preferences and app configurations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-400" /> Profile
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                value={userDetails.firstname}
                onChange={handleUserDetailsChange}
                name="firstname"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={userDetails.lastname}
                onChange={handleUserDetailsChange}
                name="lastname"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="example@email.com"
                value={userDetails.email}
                onChange={handleUserDetailsChange}
                name="email"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
                Save Profile
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-red-400" /> Security
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input
                type="password"
                name="oldPassword"
                value={changePassword.oldPassword}
                onChange={handleChange}
                placeholder="Old Password"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="password"
                name="newPassword"
                value={changePassword.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              {/* Checkbox for re-login */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="forceRelogin"
                  checked={changePassword.forceRelogin}
                  onChange={(e) =>
                    setChangePassword({
                      ...changePassword,
                      forceRelogin: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-red-600 text-red-600 bg-gray-900 border-gray-700 rounded focus:ring-red-500"
                />
                <label htmlFor="forceRelogin" className="text-sm text-gray-300">
                  Require re-login after password change
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-yellow-400" /> Notifications
            </h2>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Switch
                checked={notifications}
                onChange={setNotifications}
                className={`${
                  notifications ? "bg-green-500" : "bg-gray-600"
                } relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    notifications ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-purple-400" /> Appearance
            </h2>
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={`${
                  darkMode ? "bg-purple-600" : "bg-gray-600"
                } relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SettingsPage;
