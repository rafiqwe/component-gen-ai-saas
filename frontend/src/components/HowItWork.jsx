import { FileCode2, Play, Download } from "lucide-react";
import { motion } from "framer-motion";
import GlowLine from "./GlowLine";
import SpotlightCard from "./SportLightCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <FileCode2 className="w-10 h-10 text-purple-400" />,
    title: "1. Write or Paste Prompt",
    description:
      "Describe the component you need in plain English or paste existing code.",
  },
  {
    icon: <Play className="w-10 h-10 text-pink-400" />,
    title: "2. Live Preview",
    description:
      "See instant results with Monaco Editor + React Live preview — edit on the fly.",
  },
  {
    icon: <Download className="w-10 h-10 text-green-400" />,
    title: "3. Export & Use",
    description:
      "Copy or download production-ready code and use it in your project immediately.",
  },
];

export default function HowItWorks() {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
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
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
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
    <section id="howitwork" className="relative py-15 md:20 mt-5 md:mt-0  h-full  md:h-screen flex items-center ">
      <GlowLine orientation="horizontal" position="0%" color="red" />
      <div className="max-w-6xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          How It Works
        </h2>
        <p
          ref={subtitleRef}
          className="text-gray-300 text-lg max-w-2xl mx-auto mb-16"
        >
          From idea to production in just three simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <SpotlightCard key={index}>
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="p-8 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl flex flex-col items-center text-center"
              >
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
