"use client";

import { useEffect, useRef } from "react";
import { Code2, Rocket, Layers, Wand2 } from "lucide-react";
import GlowLine from "./GlowLine";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Code2 className="w-8 h-8 text-purple-400" />,
    title: "AI Code Generation",
    description:
      "Generate clean React + Tailwind components instantly from your prompt.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-pink-400" />,
    title: "Live Preview",
    description: "Edit and preview your code in real-time.",
  },
  {
    icon: <Layers className="w-8 h-8 text-blue-400" />,
    title: "Export Ready",
    description: "Download or copy production-ready code with a single click.",
  },
  {
    icon: <Wand2 className="w-8 h-8 text-green-400" />,
    title: "Modern UI",
    description:
      "Glassmorphic cards, smooth animations, and professional layouts.",
  },
];

export default function Features() {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0], // trigger when first card enters viewport
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
          trigger: cardsRef.current[0], // trigger when first card enters viewport
          scroller: "body",
          start: "top 100%",
          end: "top 50%",
          scrub: 0.5,
        },
      }
    );
    tl.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0], // trigger when first card enters viewport
          scroller: "body",
          start: "top 80%", // when card is 80% down viewport
          end: "top 50%",
          scrub: 0.6,
        },
      }
    );
  });

  return (
    <section id="features" className="relative w-full py-20 flex items-center justify-center h-full md:h-screen">
      <GlowLine orientation="horizontal" position="0%" color="blue" />
      <div className="max-w-7xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Powerful Features
        </h2>
        <p
          ref={subtitleRef}
          className="text-gray-300 text-lg max-w-2xl mx-auto mb-16"
        >
          Everything you need to build stunning web components faster than ever.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="p-6 rounded-4xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
