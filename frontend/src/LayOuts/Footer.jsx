// Footer.jsx
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

const navigationLinks = [
  { name: "Home", path: "home" },
  { name: "Features", path: "features" },
  { name: "Pricing", path: "pricing" },
  { name: "FAQ", path: "faq" },
];

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-lg text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            GenAI
          </h2>
          <p className="text-gray-300">
            Build, edit, and ship frontend components faster with AI-powered
            code generation. Designed for developers, by developers.
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://github.com/rafiqwe"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://x.com/rmlrabbi"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-rabbi-dev/"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="flex gap-1 flex-col text-md">
            {navigationLinks.map((link, index) => (
              <li
                key={index}
                className="capitalize hover:text-gray-400 transition-colors duration-200 cursor-pointer"
              >
                <Link smooth={true} duration={800} offset={-60} to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-semibold text-white mb-2">Stay Updated</h3>
          <p className="text-gray-300">
            Subscribe to get latest updates and news.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-xl p-2 flex-1 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 py-2 font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} GeneAi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
