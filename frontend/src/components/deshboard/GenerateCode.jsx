import { Helmet } from "react-helmet-async";
import Seo from "../Seo";

const GenAILandingPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GenAi Demo Preview",
    url: "https://yourdomain.com/demo",
    description:
      "Experience GenAi in action. Preview AI-generated React components, UI blocks, and design elements instantly.",
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    creator: {
      "@type": "Organization",
      name: "Your Company Name",
    },
    featureList: [
      "Generate UI components from plain text",
      "Live preview of components",
      "Edit, copy, and download components",
    ],
  };
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Seo
        title="GenAi Demo – Preview AI Generated Page"
        description="Experience GenAi in action. Preview AI-generated React components, UI blocks, and design elements instantly before you sign up."
        url={`${import.meta.env.WEBSITE_URL}/genai-created-demo`}
        noindex={false}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-gray-100 font-sans antialiased overflow-x-hidden">
        <header className="relative py-24 flex flex-col items-center justify-center text-center px-4 md:px-8">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div
            className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
            style={{ animationDelay: "4s" }}
          ></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 mb-6">
              GenAI: Code Your Future, Faster.
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Unleash the power of AI to generate beautiful, functional code and
              UI components in seconds. Your ideas, brought to life.
            </p>
            <button className="relative px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/50 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
              Get Started Free
              <span className="absolute inset-0 rounded-full ring-2 ring-purple-400 ring-offset-2 ring-offset-gray-900 animate-pulse-slow"></span>
            </button>
          </div>
        </header>

        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              See GenAI in Action
            </h2>

            <div className="relative w-full aspect-video min-h-[500px] md:min-h-[600px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl shadow-indigo-500/20 overflow-hidden group flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-70 rounded-3xl z-0"></div>
              <div className="relative z-10 h-full w-full flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 flex flex-col border border-white/10 shadow-inner shadow-gray-800">
                  <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
                    <div className="mb-6">
                      <div className="text-purple-300 font-semibold mb-2">
                        You:
                      </div>
                      <p className="bg-purple-800/50 p-3 rounded-xl rounded-bl-none max-w-[85%] text-gray-100 shadow-md">
                        Generate a responsive React component for a user profile
                        card with an avatar, name, title, and two action
                        buttons.
                      </p>
                    </div>
                    <div>
                      <div className="text-blue-300 font-semibold mb-2">
                        GenAI:
                      </div>
                      <div className="bg-gray-800 p-4 rounded-xl rounded-tl-none max-w-[95%] shadow-md border border-gray-700">
                        <pre className="whitespace-pre-wrap text-sm md:text-base font-mono text-gray-200">
                          <code className="language-jsx">
                            {`import React from 'react';

const UserProfileCard = ({ user }) => {
  return (
    <div className="max-w-sm mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden md:max-w-2xl transform hover:scale-105 transition duration-300">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={user.avatar} alt="User avatar" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-400 font-semibold">{user.title}</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-white hover:underline">{user.name}</a>
          <p className="mt-2 text-gray-400">{user.bio}</p>
          <div className="mt-4 flex space-x-3">
            <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition duration-200">
              View Profile
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <form className="mt-6 flex gap-3">
                    <input
                      type="text"
                      placeholder="Ask GenAI to generate code..."
                      className="flex-grow p-3 rounded-xl bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-400"
                      aria-label="Code generation prompt"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition duration-300 shadow-md"
                    >
                      Send
                    </button>
                  </form>
                </div>

                <div className="lg:w-1/3 bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between border border-white/10 shadow-inner shadow-gray-800">
                  <div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-lime-300 mb-4">
                      Generated UI Preview
                    </h3>
                    <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-sm italic border border-gray-700 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 p-4 flex flex-col justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-full animate-pulse"></div>
                          <div>
                            <div className="h-4 bg-gray-300 w-32 rounded mb-2 animate-pulse-slow"></div>
                            <div className="h-3 bg-gray-400 w-24 rounded animate-pulse"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-500 w-full rounded animate-pulse-slow"></div>
                          <div className="h-3 bg-gray-500 w-5/6 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-500 w-4/6 rounded animate-pulse-slow"></div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <div className="w-20 h-8 bg-blue-500 rounded-md animate-pulse"></div>
                          <div className="w-20 h-8 bg-purple-500 rounded-md animate-pulse-slow"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">
                      Visualize your generated components instantly.
                    </p>
                  </div>
                  <button className="mt-8 w-full py-3 bg-gradient-to-r from-teal-500 to-lime-500 text-gray-900 font-bold rounded-xl hover:from-teal-600 hover:to-lime-600 transition duration-300 shadow-lg transform hover:-translate-y-0.5">
                    Explore Components
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
              Simple, Transparent Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg shadow-gray-900/30 transform hover:scale-105 transition duration-300">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gray-600 to-gray-700 text-xs font-bold uppercase rounded-full tracking-wider shadow-md text-gray-200">
                  Starter
                </span>
                <h3 className="text-3xl font-bold text-gray-100 mt-6 mb-4">
                  Free Plan
                </h3>
                <p className="text-5xl font-extrabold text-white mb-6">
                  $0<span className="text-xl text-gray-400">/month</span>
                </p>
                <ul className="text-gray-300 text-left space-y-3 mb-8 w-full">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    50 AI Code Generations
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Community Support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Basic UI Component Library
                  </li>
                </ul>
                <button className="mt-auto w-full py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition duration-300">
                  Start Free
                </button>
              </div>

              <div className="relative bg-gradient-to-br from-purple-800/30 to-blue-800/30 backdrop-blur-xl border border-blue-500/50 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl shadow-blue-500/30 transform hover:scale-105 transition duration-300 ring-2 ring-blue-500">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-bold uppercase rounded-full tracking-wider shadow-md text-white animate-pulse">
                  Popular
                </span>
                <h3 className="text-3xl font-bold text-white mt-6 mb-4">
                  Pro Plan
                </h3>
                <p className="text-5xl font-extrabold text-white mb-6">
                  $29<span className="text-xl text-blue-300">/month</span>
                </p>
                <ul className="text-gray-200 text-left space-y-3 mb-8 w-full">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Unlimited AI Code Generations
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Priority Email Support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Advanced UI Component Library
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Early Access to New Features
                  </li>
                </ul>
                <button className="mt-auto w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg shadow-blue-500/40 transform hover:-translate-y-1">
                  Choose Pro
                </button>
              </div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg shadow-gray-900/30 transform hover:scale-105 transition duration-300">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-violet-700 text-xs font-bold uppercase rounded-full tracking-wider shadow-md text-white">
                  Team
                </span>
                <h3 className="text-3xl font-bold text-gray-100 mt-6 mb-4">
                  Team Plan
                </h3>
                <p className="text-5xl font-extrabold text-white mb-6">
                  $99<span className="text-xl text-gray-400">/month</span>
                </p>
                <ul className="text-gray-300 text-left space-y-3 mb-8 w-full">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Up to 10 Team Members
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Dedicated Account Manager
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    SLA & Onboarding Support
                  </li>
                </ul>
                <button className="mt-auto w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} GenAI. All rights reserved.</p>
        </footer>

        <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Custom scrollbar for demo section */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #a78bfa transparent; /* thumb and track */
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #a78bfa; /* purple-400 */
          border-radius: 20px;
          border: 2px solid transparent; /* padding */
        }
      `}</style>
      </div>
    </>
  );
};

export default GenAILandingPage;
