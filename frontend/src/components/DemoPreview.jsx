import CardSwap, { Card } from "./CardSwap";

const DemoPreview = () => {
  return (
    <div className="w-full h-full overflow-hidden text-white px-6 md:px-12">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Interactive Demo
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Experience the <code className="bg-gray-800/60 px-2 py-1 rounded text-indigo-300">CardSwap</code> 
          component in action. It cycles through multiple cards with smooth transitions, 
          perfect for showcasing your SaaS product features in an engaging way.
        </p>
      </div>

      {/* Card Swap Preview */}
      <div className="relative flex justify-center items-center" style={{ height: "600px" }}>
        <CardSwap cardDistance={70} verticalDistance={80} delay={4500} pauseOnHover>
          <Card>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-indigo-300">Feature One</h3>
              <p className="text-gray-200 text-center">Highlight the first key benefit of your product with clarity and impact.</p>
            </div>
          </Card>

          <Card>
            <div className="bg-gradient-to-br from-blue-700/40 to-indigo-800/40 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-blue-300">Feature Two</h3>
              <p className="text-gray-200 text-center">Showcase another powerful feature of your SaaS solution.</p>
            </div>
          </Card>

          <Card>
            <div className="bg-gradient-to-br from-purple-700/40 to-pink-700/40 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">Feature Three</h3>
              <p className="text-gray-200 text-center">Finish strong with a third feature, keeping users engaged and curious.</p>
            </div>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
};

export default DemoPreview;
