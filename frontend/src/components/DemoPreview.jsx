import { Helmet } from "react-helmet-async";
import CardSwap, { Card } from "./CardSwap";
import GlowLine from "./GlowLine";
import Seo from "./Seo";

const DemoPreview = () => {
  return (
    <>
      <div className="w-full h-full overflow-hidden relative text-white px-6 md:px-12">
        <GlowLine orientation="horizontal" position="0%" color="green" />

        {/* Section Header */}
        <div className="mb-12 text-center mt-10">
          <h1 className="text-xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Try GenAI in Action
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Generate, preview, edit and download production-ready components in
            seconds — powered by{" "}
            <code className="bg-gray-800/60 px-2 py-1 rounded text-indigo-300">
              GenAI
            </code>
          </p>
        </div>

        {/* Card Swap Preview */}
        <div
          className="relative flex justify-center w-full h-full items-center flex-wrap"
          style={{ height: "700px" }}
        >
          {/* Left Section */}
          <div className="absolute top-0 md:left-0 mb-30 max-w-lg text-left">
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Build Smarter with{" "}
              <span className="text-xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                GenAi
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Turn your plain text ideas into production-ready components in
              seconds. Live preview, edit, and export with zero hassle.
            </p>
            <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
              <a
                href="/genai-created-demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 See GenAi in Action
              </a>
            </button>
          </div>

          {/* Right Section - CardSwap */}
          <CardSwap
            cardDistance={70}
            verticalDistance={80}
            delay={4500}
            pauseOnHover
          >
            {/* Step 1 - Generate */}
            <Card>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border  border-white/20 px-10 py-5 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold mb-3 text-indigo-300">
                  Generate Instantly
                </h3>
                <p className="text-gray-200 text-center">
                  Just describe your idea in plain text and let{" "}
                  <span className="text-indigo-400 font-medium">GenAI</span>{" "}
                  turn it into a ready-to-use component in seconds.
                </p>
              </div>
              <div className="w-full h-full overflow-hidden rounded-xl">
                <img
                  src="/images/genai-generate.png"
                  className="w-full h-full object-cover object-top transform -translate-y-1/5"
                  alt="GenAI generate demo"
                />
              </div>
            </Card>

            {/* Step 2 - Preview */}
            <Card>
              <div className="bg-gradient-to-br from-blue-700/40 rounded-xl to-indigo-800/40 backdrop-blur-lg shadow-xl border border-white/10 px-10 py-5 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold mb-3 text-blue-300">
                  Live Preview
                </h3>
                <p className="text-gray-200 text-center">
                  See your components instantly — full-screen, responsive, and
                  exactly how they’ll look in production.
                </p>
              </div>
              <div className="w-full h-full overflow-hidden rounded-xl">
                <img
                  src="/images/genai-preview.webp"
                  className="w-full h-full object-cover object-top transform -translate-y-1/5"
                  alt="GenAI preview demo"
                />
              </div>
            </Card>

            {/* Step 3 - Edit & Export */}
            <Card>
              <div className="bg-gradient-to-br rounded-xl from-purple-700/40 to-pink-700/40 backdrop-blur-lg shadow-xl border border-white/10 px-10 py-5 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold mb-3 text-purple-300">
                  Edit, Copy & Download
                </h3>
                <p className="text-gray-200 text-center">
                  Customize code directly, copy with one click, or download
                  complete components ready to ship.
                </p>
              </div>
              <div className="w-full h-full overflow-hidden rounded-xl">
                <img
                  src="/images/genai-live-edit-and-preview.png"
                  className="w-full h-full object-cover object-top transform -translate-y-1/5"
                  alt="GenAI edit demo"
                />
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </>
  );
};

export default DemoPreview;
