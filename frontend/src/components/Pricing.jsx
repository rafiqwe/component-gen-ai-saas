import { Check } from "lucide-react";
import SpotlightCard from "./SportLightCard";
import GlowLine from "./GlowLine";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

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
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current, // trigger when first card enters viewport
          scroller: "body",
          start: "top 100%",
          end: "top 50%",
          scrub: 0.5,
        },
      }
    );
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current, // trigger when first card enters viewport
          scroller: "body",
          start: "top 100%",
          end: "top 50%",
          scrub: 0.5,
        },
      }
    );
    tl.fromTo(
      cardsRef.current,
      { opacity: 0, x: -200 },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        stagger: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0], // trigger when first card enters viewport
          scroller: "body",
          start: "top 80%", // when card is 80% down viewport
          end: "top 50%",
          scrub: 1,
        },
      }
    );
  });

  return (
    <section
      id="pricing"
      className="relative w-full h-full md:mt-0 pb-20 pt-10 "
    >
      <GlowLine orientation="horizontal" position="0%" color="blue" />
      <div className="max-w-6xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Pricing
        </h2>
        <p
          ref={subtitleRef}
          className="text-gray-300 text-lg max-w-2xl mx-auto mb-16"
        >
          Simple, transparent plans. Start for free — upgrade when you grow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <SpotlightCard key={index}>
              <div
                ref={(el) => (cardsRef.current[index] = el)}
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
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
