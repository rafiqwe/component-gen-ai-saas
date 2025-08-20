import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
const token = localStorage.getItem("token");

const navigationLinks = [
  { name: "Home", path: "home" },
  { name: "Features", path: "features" },
  { name: "Pricing", path: "pricing" },
  { name: "FAQ", path: "faq" },
  ...(token ? [] : [{ name: "Login", path: "/login" }]), // ✅ if no token, show login
];

const Header = () => {
  const liRefs = useRef([]);
  const headerRef = useRef();
  const logoRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
    });
    tl.from(logoRef.current, {
      opacity: 0,
      duration: 0.5,
      x: -100,
    });
    tl.from(liRefs.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });
  });

  return (
    <div
      ref={headerRef}
      className="absolute top-10 left-1/2 -translate-x-1/2 z-10 w-[70%] text-white"
    >
      <header className="flex items-center justify-between px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        {/* Logo */}
        <div ref={logoRef} className="logo">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            <NavLink to={"/"}>GenAI</NavLink>
          </h2>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-8 text-lg font-medium">
            {navigationLinks.map((link, index) => (
              <li
                key={index}
                ref={(el) => (liRefs.current[index] = el)}
                className="capitalize hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                {link.path.startsWith("/") ? (
                  <NavLink to={link.path}>{link.name}</NavLink>
                ) : (
                  <Link
                    to={link.path}
                    smooth={true}
                    duration={800}
                    offset={-60}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
