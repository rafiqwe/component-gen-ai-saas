import React, { useContext } from "react";
import { motion } from "framer-motion";
import { UserDataContext } from "../../contexts/UserContext";
import { Crown } from "lucide-react";
const planStyles = {
  Free: {
    color: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-400/30",
    text: "Upgrade for more power",
  },
  Pro: {
    color: "text-green-400",
    badge: "bg-green-500/10 text-green-300 border-green-400/30",
    text: "Enjoy premium features",
  },
  Team: {
    color: "text-yellow-400",
    badge: "bg-yellow-500/10 text-yellow-300 border-yellow-400/30",
    text: "Team collaboration enabled",
  },
};
const PlanCard = () => {
  const { user } = useContext(UserDataContext);
  const currentPlan = planStyles[user?.plan] || planStyles.Free;
  return (
    //   {/* Plan Card */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative p-6 rounded-2xl bg-gray-900/80 border border-gray-800 shadow-md"
    >
      <div className="flex items-center gap-2 mb-2">
        <Crown className={`w-5 h-5 ${currentPlan.color}`} />
        <h3 className="text-lg font-semibold text-gray-200">Plan</h3>
      </div>
      <p className={`text-3xl font-bold mt-2 ${currentPlan.color}`}>
        {user?.plan}
      </p>
      <p className="text-sm text-gray-400 mt-1">{currentPlan.text}</p>

      {/* Dynamic Badge */}
      <span
        className={`absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full border ${currentPlan.badge}`}
      >
        {user?.plan} Tier
      </span>
    </motion.div>
  );
};

export default PlanCard;
