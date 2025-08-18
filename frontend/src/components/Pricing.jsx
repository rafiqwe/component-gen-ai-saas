import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SpotlightCard from "./SportLightCard";
import GlowLine from "./GlowLine";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For hobby projects and quick experiments.",
    features: [
      "Basic components",
      "Community support",
      "Live preview (limited)",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For developers who need more power & flexibility.",
    features: [
      "All components unlocked",
      "Priority support",
      "Unlimited live preview",
    ],
    highlight: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "Best for startups & small teams collaborating.",
    features: [
      "Everything in Pro",
      "Team collaboration tools",
      "Early access to new features",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative w-full h-full mt-16 md:mt-0 pb-20 pt-10 ">
      <GlowLine orientation="horizontal" position="0%" color="blue" />  
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Pricing
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-16">
          Simple, transparent plans. Start for free — upgrade when you grow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <SpotlightCard key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`p-10 rounded-3xl backdrop-blur-lg shadow-xl border ${
                  plan.highlight
                    ? "bg-gradient-to-br from-purple-600/70 to-pink-600/70 border-purple-400"
                    : "bg-white/10 border-white/20"
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-end justify-center mb-6">
                  <span className="text-5xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-300 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-300 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center pl-5 gap-2 text-gray-200"
                    >
                      <Check className="w-5 h-5 text-green-400" /> {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full cursor-pointer py-3 rounded-xl font-semibold transition ${
                    plan.highlight
                      ? "bg-white text-purple-700 hover:bg-gray-100"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {plan.highlight ? "Get Pro" : "Get Started"}
                </button>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
