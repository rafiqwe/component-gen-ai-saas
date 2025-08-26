// PlanBadge.jsx
import { Crown, Users, Sparkles } from "lucide-react";

const styles = {
  free: {
    wrap: "bg-sky-500/15 text-sky-400 ring-1 ring-inset ring-sky-500/30",
    icon: <Sparkles size={14} className="opacity-90" />,
    label: "Free Plan",
  },
  pro: {
    wrap: "bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30",
    icon: <Crown size={14} className="opacity-90" />,
    label: "Pro Plan",
  },
  team: {
    wrap: "bg-violet-500/15 text-violet-400 ring-1 ring-inset ring-violet-500/30",
    icon: <Users size={14} className="opacity-90" />,
    label: "Team Plan",
  },
};

export default function PlanBadge({ plan = "free", className = "" }) {
  const s = styles[plan.toLowerCase()] ?? styles.free;
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-medium",
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
        s.wrap,
        className,
      ].join(" ")}
    >
      {s.icon}
      {s.label}
    </span>
  );
}
