import { Menu, Bell } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { UserDataContext } from "../../contexts/UserContext";

const Header = ({ setSidebarOpen, sidebar }) => {
  const [previewImage, setPreviewImage] = useState();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // 👈 for arrow navigation
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);

  // Static suggestion list
  const allSuggestions = [
    {
      title: "Settings",
      description: "Manage your preferences",
      path: "/genAi/setting",
    },
    {
      title: "Profile",
      description: "View and edit your profile",
      path: "/genAi/profile",
    },
    {
      title: "Dashboard",
      description: "Overview of your activity",
      path: "/genAi",
    },
    {
      title: "Billing",
      description: "View and update billing info",
      path: "/genAi/pricing",
    },
    {
      title: "Generate Component",
      description: "Create your component with GenAi",
      path: "/genAi/component-generator",
    },
    {
      title: "My Component",
      description: "See your save components",
      path: "/genAi/my-component",
    },
  ];

  // filter suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const filtered = allSuggestions.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
    setActiveIndex(-1); // reset selection on new input
  }, [query]);

  // handle key events
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && suggestions.length > 0) {
      const selected =
        activeIndex >= 0 ? suggestions[activeIndex] : suggestions[0];
      navigate(selected.path);
      setQuery("");
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };
  // const fakeImgeSrc =

  // fetch profile image
  useEffect(() => {
    let blobUrl;
    async function response() {
      try {
        const res = await API.get(`/api/auth/profile-image`, {
          responseType: "blob",
        });
        blobUrl = URL.createObjectURL(res.data);
        setPreviewImage(blobUrl);
      } catch (error) {
        console.error("Profile image error", error);
      }
    }
    response();

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return (
    <header className="flex items-center fixed top-0 w-full justify-between px-6 h-16 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 shadow-md z-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
        onClick={() => setSidebarOpen(!sidebar)}
      >
        <Menu className="w-5 h-5 text-gray-300" />
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Input + Suggestions */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="pl-3 pr-4 py-2 text-sm bg-gray-800/70 border border-gray-700 rounded-xl 
                       text-gray-200 placeholder-gray-400 
                       outline-none focus:ring-2 focus:bg-gray-800/40 w-48 md:w-64 transition"
          />

          {/* Suggestions Dropdown */}
          {query && suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  className={`px-3 py-2 text-sm cursor-pointer 
                    ${
                      activeIndex === idx
                        ? "bg-gray-500 rounded-sm text-white"
                        : "text-gray-200 hover:bg-gray-700"
                    }`}
                  onClick={() => {
                    navigate(item.path);
                    setQuery("");
                    setSuggestions([]);
                    setActiveIndex(-1);
                  }}
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notification Bell */}
        <button className="p-2 rounded-full hover:bg-gray-800 transition relative">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow" />
        </button>

        {/* User Avatar */}
        <Link to={"/genAi/profile"}>
          <img
            src={
              previewImage
                ? previewImage
                : `https://i.pravatar.cc/150?u=${user?.email || Math.random()}`
            }
            alt="profile"
            className="w-9 h-9 rounded-full border-2 border-indigo-500/50 hover:scale-105 transition"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
