const Header = () => {
  const NavList = ["home", "features", "pricing", "contect", "login"];
  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 w-[70%] text-white">
      <header className="flex items-center justify-between px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        {/* Logo */}
        <div className="logo">
          <h2 className="font-bold text-2xl tracking-wide">GenAi</h2>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-8 text-lg font-medium">
            {NavList.map((list) => (
              <li
                key={list}
                className= " capitalize hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                {list}
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
