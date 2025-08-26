import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../services/api";

const ChangePasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    reLogin: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setChangePassword({
      ...changePassword,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
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

      if (changePassword.reLogin) {
        // Clear tokens or log out user
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.info("Please log in again.");
      }

      setIsOpen(false);
      setChangePassword({ oldPassword: "", newPassword: "", reLogin: false });
    } catch (error) {
      toast.error(`❌ Failed to update: ${error.message || "Network error"}`);
    }
  };

  return (
    <div>
      {/* Trigger button */}
      <button onClick={() => setIsOpen(true)}>Change Password</button>

      {/* Modal */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className=" rounded-xl shadow-lg w-full bg-gray-900 max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={changePassword.oldPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={changePassword.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="reLogin"
                  checked={changePassword.reLogin}
                  onChange={handleChange}
                  className="w-4 h-4 accent-red-600"
                />
                <span className="text-sm text-gray-300">
                  Require re-login after change
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 cursor-pointer py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 cursor-pointer py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
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

export default ChangePasswordModal;
