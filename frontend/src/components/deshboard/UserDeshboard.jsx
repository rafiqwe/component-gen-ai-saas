import { motion } from "framer-motion";
import { Code2, LayoutDashboard, Settings, CreditCard } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../contexts/UserContext";
import API from "../../services/api";
import { Link } from "react-router-dom";

const navItems = [
  {
    name: "Generate Component",
    icon: <Code2 size={18} />,
    link: "/genAi/component-generator",
  },
  {
    name: "My Components",
    icon: <LayoutDashboard size={18} />,
    link: "/genAi/my-component",
  },
  {
    name: "Settings",
    icon: <Settings size={18} />,
    link: "#",
  },
  {
    name: "Upgrade",
    icon: <CreditCard size={18} />,
    link: "#",
  },
];

const UserDashboard = () => {
  const { user } = useContext(UserDataContext);
  const [compoentLength, setcompoentLength] = useState(0);
  const [usagePercents, setUsagePercents] = useState(0);
  const [activitys, setActivitys] = useState([]);
  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const res = await API.get("/api/components");
        const usagePercent = await API.get("/api/usage/stats");

        if (usagePercent.status === 200) {
          const data = usagePercent.data;
          setUsagePercents(data.percent);
        }

        if (res.status === 200) {
          const data = res.data;
          setcompoentLength(data.length);
        }
      } catch (error) {
        console.log("fetch Component error:", error);
      }
    };
    const fetchActivity = async () => {
      try {
        const res = await API.get("/api/activity");
        console.log(res);
        if (res.status === 200) {
          const data = res.data;
          
          setActivitys(data);
        }
      } catch (error) {
        console.log("fetch activity error:", error);
      }
    };
    fetchComponent();
    fetchActivity();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold">
          Welcome back,{" "}
          {user?.fullname?.firstname + " " + user?.fullname?.lastname}
          👋
        </h2>
        <p className="mt-2 text-indigo-100">
          Ready to continue building amazing components today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-200">My Components</h3>
          <p className="text-3xl font-bold text-indigo-400 mt-2">
            {compoentLength}
          </p>
          <p className="text-sm text-gray-400 mt-1">Saved so far</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-200">Usage</h3>
          <p className="text-3xl font-bold text-indigo-400 mt-2">
            {" "}
            {usagePercents}%
          </p>
          <p className="text-sm text-gray-400 mt-1">Of free tier</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-200">Plan</h3>
          <p className="text-3xl font-bold text-indigo-400 mt-2">Free</p>
          <p className="text-sm text-gray-400 mt-1">Upgrade for more power</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-gray-200 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {navItems.map((navItem, idx) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center cursor-pointer justify-center p-6 bg-gray-900/80 border border-gray-800 rounded-2xl shadow-md hover:bg-indigo-600/20 transition"
            >
              <Link
                to={navItem.link}
                key={idx}
                className="flex flex-col items-center justify-center"
              >
                <span className="w-6 h-6 text-indigo-400">{navItem.icon}</span>
                <span className="mt-2 font-medium text-gray-300">
                  {navItem.name}
                </span>
              </Link>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-bold text-gray-200 mb-4">
          Recent Activity
        </h3>
        <ul className="space-y-3">
          {activitys.map((activity, idx) => (
            <li
              key={idx}
              className="p-4 bg-gray-900/80 border border-gray-800 rounded-xl shadow-sm flex justify-between "
            >
              <div className="flex flex-col">
                <span className="text-gray-300 font-medium">
                  {activity.action}
                </span>
                {activity.prompt && (
                  <span className="text-gray-400 line-clamp-1 text-sm italic">
                    “{activity.prompt}”
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(activity.createdAt).toLocaleString()}
                {/* or format like "2 hrs ago" */}
              </span>
            </li>
          ))}

          {/* <li className="p-4 bg-gray-900/80 border border-gray-800 rounded-xl shadow-sm flex justify-between">
            <span className="text-gray-300">Created a Button component</span>
            <span className="text-sm text-gray-500">2 hrs ago</span>
          </li>
          <li className="p-4 bg-gray-900/80 border border-gray-800 rounded-xl shadow-sm flex justify-between">
            <span className="text-gray-300">Updated Card component</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </li>
          <li className="p-4 bg-gray-900/80 border border-gray-800 rounded-xl shadow-sm flex justify-between">
            <span className="text-gray-300">Exported Navbar code</span>
            <span className="text-sm text-gray-500">3 days ago</span>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
