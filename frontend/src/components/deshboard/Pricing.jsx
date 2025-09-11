import React, { useState } from "react";
import { Check, X } from "lucide-react";
import SpotlightCard from "../SportLightCard";
import Seo from "../Seo";

const PricingPage = () => {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Basic",
      desc: "Perfect for individuals starting with GenAI.",
      monthly: 9,
      yearly: 90,
      features: [
        "Access to basic AI tools",
        "Community support",
        "100 API calls / month",
      ],
      notIncluded: [
        "Custom integrations",
        "Priority support",
        "Team collaboration",
      ],
    },
    {
      name: "Pro",
      desc: "Best for developers and freelancers.",
      monthly: 29,
      yearly: 290,
      features: [
        "Unlimited AI generations",
        "Advanced AI models",
        "1,000 API calls / month",
        "Priority support",
      ],
      notIncluded: ["Team collaboration", "Dedicated manager"],
      highlighted: true,
    },
    {
      name: "Enterprise",
      desc: "For teams & companies scaling with GenAI.",
      monthly: 99,
      yearly: 990,
      features: [
        "Unlimited everything",
        "Custom integrations",
        "Dedicated success manager",
        "Team collaboration",
        "24/7 Priority Support",
      ],
      notIncluded: [],
    },
  ];

  return (
    <>
      <Seo
        title="Pricing – GenAi"
        description="Choose the perfect GenAi plan for you. Start free, or upgrade to Pro and Team plans for more powerful AI features."
        url={`${import.meta.env.WEBSITE_URL}/genAi/pricing`}
        noindex={false}
      />
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-gray-400">
            Simple, transparent pricing. No hidden fees.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center space-x-3 mb-10">
          <span
            className={
              !yearly ? "text-blue-500 font-semibold" : "text-gray-400"
            }
          >
            Monthly
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={yearly}
              onChange={() => setYearly(!yearly)}
            />
            <div className="w-14 h-7 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition"></div>
            <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-7"></div>
          </label>
          <span
            className={yearly ? "text-blue-500 font-semibold" : "text-gray-400"}
          >
            Yearly
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          {plans.map((plan, idx) => (
            <SpotlightCard key={idx}>
              <div
                className={`rounded-2xl shadow-lg border border-gray-800 p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-blue-600 to-blue-800 scale-105"
                    : "bg-gray-900"
                }`}
              >
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-300 mb-6">{plan.desc}</p>

                <div className="text-4xl font-extrabold mb-6">
                  ${yearly ? plan.yearly : plan.monthly}
                  <span className="text-lg text-gray-400 font-normal">
                    /{yearly ? "year" : "month"}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Check className="text-green-400 w-5 h-5" />
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center space-x-2 text-gray-500 line-through"
                    >
                      <X className="w-5 h-5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`mt-8 w-full  cursor-pointer py-3 rounded-xl font-semibold ${
                    plan.highlighted
                      ? "bg-white text-blue-700 hover:bg-gray-200"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingPage;
