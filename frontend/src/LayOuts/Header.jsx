"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const token = localStorage.getItem("token");

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "features" },
  { name: "Pricing", path: "pricing" },
  { name: "FAQ", path: "faq" },
  ...(token ? [] : [{ name: "Login", path: "/login" }]),
];

const Header = () => {
  const liRefs = useRef([]);
  const MoliRefs = useRef([]);
  const headerRef = useRef();
  const mobResNavRef = useRef();
  const menuRef = useRef();
  const logoRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // GSAP intro animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(headerRef.current, { y: -80, opacity: 0, duration: 1 });
    tl.from(
      logoRef.current,
      { opacity: 0, scale: 0.8, duration: 0.6 },
      "-=0.5"
    );
    tl.from(
      liRefs.current,
      { y: -20, opacity: 0, duration: 0.6, stagger: 0.15 },
      "-=0.3"
    );
  });

  // Scroll effect (solid after scroll)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  // Animate mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        ".mobile-menu",
        { scale:0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [isMenuOpen]);


  return (
    <div
      ref={headerRef}
      className={`fixed   left-1/6 -translate-x-1/2 z-50 w-[70%] text-white transition-all duration-300 ${
        scrolled ? "top-2" : "top-10"
      }`}
    >
      <header
        className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-full border shadow-lg transition-all duration-300 ${
          scrolled
            ? "bg-white/60 dark:bg-[#111]/60 border-gray-200 dark:border-gray-800 backdrop-blur-xl"
            : "bg-white/20 dark:bg-[#111]/20 border-white/30 backdrop-blur-xl"
        }`}
      >
        {/* Logo */}
        <div ref={logoRef} className="logo">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            <NavLink to={"/"}>GenAI</NavLink>
          </h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 lg:gap-8 text-sm lg:text-base font-medium">
            {navigationLinks.map((link, index) => (
              <li
                key={index}
                ref={(el) => (liRefs.current[index] = el)}
                className="capitalize font-bold text-lg hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              >
                {link.path.startsWith("/") ? (
                  <NavLink to={link.path}>{link.name}</NavLink>
                ) : (
                  <Link to={link.path} smooth duration={800} offset={-60}>
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden cursor-pointer text-gray-800 dark:text-gray-200 text-2xl focus:outline-none"
        >
          {isMenuOpen ? (
            <HiX className="cursor-pointer" />
          ) : (
            <HiMenuAlt3 ref={menuRef} />
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex justify-center items-start pt-28 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="mobile-menu w-[90%] sm:w-[80%] rounded-2xl shadow-2xl p-6 border backdrop-blur-xl bg-white/40 dark:bg-[#111]/40 border-white/30"
            onClick={(e) => e.stopPropagation()}
            ref={mobResNavRef}
          >
            <ul className="flex flex-col gap-6 text-base sm:text-lg font-medium text-center">
              {navigationLinks.map((link, index) => (
                <li
                  key={index}
                  ref={(el) => (MoliRefs.current[index] = el)}
                  className="capitalize hover:text-blue-500 transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.path.startsWith("/") ? (
                    <NavLink
                      onClick={() => setIsMenuOpen(false)}
                      to={link.path}
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      to={link.path}
                      smooth
                      duration={800}
                      offset={-60}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
