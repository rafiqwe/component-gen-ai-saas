const HeroText = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
        Build Frontend Components{" "}
        <span className="text-indigo-400">10x Faster</span> with AI
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
        Generate production-ready React components styled with Tailwind CSS.
        Edit in real-time. Preview instantly. Ship faster.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button className="px-6 cursor-pointer py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-lg transition">
          Get Started
        </button>
        <button className="px-6 py-3 cursor-pointer rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 font-medium shadow-md backdrop-blur-lg transition">
          Live Demo
        </button>
      </div>
    </section>
  );
};

export default HeroText;
