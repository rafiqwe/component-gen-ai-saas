import { Code2, Rocket, Layers, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import GlowLine from "./GlowLine";

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
  return (
    <section className="relative w-full py-20  flex items-center justify-center  h-full md:h-screen ">
      <GlowLine orientation="horizontal" position="0%" color="blue" />
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Powerful Features
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-16">
          Everything you need to build stunning web components faster than ever.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              key={index}
              className="p-6 rounded-4xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl flex flex-col items-center text-center transition-transform hover:-translate-y-3 duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
