import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { User, LogOut, Settings, Code, Crown, Camera } from "lucide-react";
import ChangePasswordModal from "./ChangePasswordModel";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserContext";
import API from "../../services/api";
import ProfileImageModal from "./ProfileImageModel";
import { toast, ToastContainer } from "react-toastify";
import PlanBadge from "./PlanBadge";
import Seo from "../Seo";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useContext(UserDataContext);
  const [usagePercents, setUsagePercents] = useState(0);
  // const [isOpen, setIsOpen] = useState(false);
  const [activitys, setActivitys] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getPercent = async () => {
      const usagePercent = await API.get("/api/usage/stats");
      if (usagePercent.status === 200) {
        setUsagePercents(usagePercent.data.percent);
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await API.get("/api/activity");
        if (res.status === 200) {
          setActivitys(res.data);
        }
      } catch (error) {
        console.log("fetch activity error:", error);
      }
    };

    fetchActivity();
    getPercent();
  }, []);

  useEffect(() => {
    let blobUrl;

    async function response() {
      const res = await API.get(`/api/auth/profile-image`, {
        responseType: "blob",
      });

      blobUrl = URL.createObjectURL(res.data);
      setPreviewImage(blobUrl);
    }

    response();

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl); // cleanup
    };
  }, []);

  // Handle Logout
  const handleLogOut = async () => {
    try {
      const res = await API.get("/api/auth/logout");
      if (res.status === 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log("logout error:", error.response?.data?.message);
    }
  };

  // Handle Profile Image Change
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // For instant preview

      try {
        // Create FormData
        const formData = new FormData();
        formData.append("image", file); // backend key name must match API expectation
        console.log(formData);

        const res = await API.post("/api/auth/change-profile-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 200) {
          const data = res.data;
          toast.success(`✅ ${data.message}`);

          console.log("Image updated:", res.data);
        }
      } catch (error) {
        console.error(
          "Update image error:",
          error.response?.data || error.message
        );
        toast.error(
          `❌ Failed to update: ${
            error.response?.data?.message || error.message || "Network error"
          }`
        );
      }
    }
  };

  const avatarSrc =
    previewImage ||
    user?.avatar ||
    `https://i.pravatar.cc/150?u=${user?.email || Math.random()}`;

  return (
    <>
      <Seo
        title="Your Profile – GenAi"
        description="Manage your personal details, profile image, and account preferences inside GenAi."
        url={`${import.meta.env.WEBSITE_URL}/genAi/profile`}
        noindex={true}
      />

      <div className="min-h-screen bg-gray-950 text-white flex justify-center p-4 sm:p-6">
        <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/3 bg-gray-800 p-6 flex flex-col items-center text-center md:text-left relative">
            <div
              className="relative cursor-pointer group"
              onClick={handleImageClick}
            >
              <img
                src={avatarSrc}
                alt="User Avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 rounded-full border-4 border-gray-700 object-cover"
              />
              {/* Camera Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-full">
                <Camera className="text-white w-6 h-6" />
              </div>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />

            {/* <ProfileImageModal isOpen={isOpen}/> */}

            <h2 className="text-lg sm:text-xl font-semibold mt-4">
              {user?.fullname?.firstname + " " + user?.fullname?.lastname}
            </h2>
            <p className="text-gray-400 text-sm mb-1">{user?.rolle}</p>
            {/* <span className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs sm:text-sm">
            <Crown size={16} /> Pro Plan
          </span> */}
            <PlanBadge plan={user?.plan} />

            <button
              onClick={handleLogOut}
              className="mt-6 cursor-pointer bg-red-500 hover:bg-red-600 w-full py-2 rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-2/3 p-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4 border-b border-gray-700 mb-6 justify-center md:justify-start">
              {["overview", "activitys", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 capitalize cursor-pointer text-sm sm:text-base ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overview */}
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Account Overview
                  </h3>
                  <p className="text-gray-400 mb-2 text-sm sm:text-base">
                    Email: {user?.email}
                  </p>
                  <p className="text-gray-400 mb-2 text-sm sm:text-base">
                    Subscription: {user?.plan} Plan
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    API Usage: {usagePercents}% / 100% this month
                  </p>
                </div>
              )}

              {/* Components
            {activeTab === "components" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Code size={18} /> My Components
                </h3>
                <ul className="space-y-3 text-sm sm:text-base">
                  <li className="p-3 bg-gray-800 rounded-lg">Card Component</li>
                  <li className="p-3 bg-gray-800 rounded-lg">Login Form</li>
                  <li className="p-3 bg-gray-800 rounded-lg">Profile Page</li>
                </ul>
              </div>
            )} */}

              {/* Activity */}
              {activeTab === "activitys" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    Your recent activity
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base">
                    {Array.isArray(activitys) && activitys.length > 0 ? (
                      activitys.map((activity, idx) => (
                        <li
                          key={activity._id || idx}
                          className="p-4 bg-gray-900/80 border border-gray-800 rounded-xl shadow-sm flex justify-between"
                        >
                          <div className="flex flex-col w-full">
                            {activity.prompt && (
                              <span className="text-gray-400 line-clamp-2 text-sm italic">
                                “{activity.prompt}”
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500 ml-3 whitespace-nowrap">
                            {new Date(activity.createdAt).toLocaleString()}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="p-6 text-center bg-gray-900/60 border border-gray-800 rounded-xl shadow-sm">
                        <h1 className="text-lg font-medium text-gray-300">
                          No activity yet
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                          Generate a component to see your activity history.
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Settings */}
              {activeTab === "settings" && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Settings size={18} /> Settings
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <button className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition">
                      <ChangePasswordModal />
                    </button>
                    <Link
                      to={"/genAi/setting"}
                      className="w-full block cursor-pointer bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
                    >
                      Notification Preferences
                    </Link>
                    <Link
                      to={"/genAi/setting"}
                      className="w-full block cursor-pointer bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
                    >
                      Toggle Dark/Light Mode
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
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
    </>
  );
};

export default ProfilePage;
