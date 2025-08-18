// FAQ + Final CTA Section
import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What frameworks are supported?",
      answer: "Currently React and Tailwind CSS. We're adding more soon.",
    },
    {
      question: "Can I edit the generated code?",
      answer: "Yes, you can use the live editor and preview in real-time.",
    },
    {
      question: "Is there a free trial?",
      answer: "Absolutely, you can try GenAI for free before upgrading.",
    },
    {
      question: "Will the components be production-ready?",
      answer: "Yes, every component is reusable, clean, and accessible.",
    },
    {
      question: "Do I need coding knowledge?",
      answer: "Some basics help, but even beginners can generate usable UI.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-20 px-6 max-w-5xl mx-auto">
      {/* FAQ Title */}
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Frequently Asked Questions
      </h2>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/20"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <h3 className="text-lg font-bold text-white flex justify-between items-center">
              {faq.question}
              <span>{openIndex === i ? "−" : "+"}</span>
            </h3>
            {openIndex === i && (
              <p className="mt-5 text-gray-200 font-semibold">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div
        className="mt-20 bg-gradient-to-r from-purple-600/70 via-indigo-600/70 to-blue-600/70 
                      backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Stop wasting hours on boilerplate.
          <span className="block">
            Generate, edit, and ship faster with GenAI 🚀
          </span>
        </h2>
        <button className="px-8 cursor-pointer py-4 rounded-2xl bg-white text-indigo-700 font-semibold text-lg shadow-md hover:scale-105 transition">
          Start Free Trial
        </button>
      </div>
    </section>
  );
};

export default FAQ;
