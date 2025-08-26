import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router-dom";

const HeroText = () => {
  const headerTextRef = useRef(null);
  const peraTextRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 2,
    });
    tl.from(headerTextRef.current, {
      scale: 0.3,
      opacity: 0,
      duration: 1,
    });
    tl.from(
      peraTextRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 1,
      },
      0.3
    );
    tl.from(buttonRef.current, {
      opacity: 0,
      duration: 1,
    });
  });
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center">
      <h1
        ref={headerTextRef}
        className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight"
      >
        Build Frontend Components{" "}
        <span className="text-indigo-400">10x Faster</span> with AI
      </h1>
      <p
        ref={peraTextRef}
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
      >
        Generate production-ready React components styled with Tailwind CSS.
        Edit in real-time. Preview instantly. Ship faster.
      </p>
      <div ref={buttonRef} className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to={'/genAi'} className="px-6 cursor-pointer py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-lg transition">
          Get Started
        </Link>
        <button className="px-6 py-3 cursor-pointer rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 font-medium shadow-md backdrop-blur-lg transition">
          Live Demo
        </button>
      </div>
    </section>
  );
};

export default HeroText;
