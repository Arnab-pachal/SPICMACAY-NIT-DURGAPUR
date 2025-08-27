import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import dark_logo from "../components/Logos/logo_dark.png";
import light_logo from "../components/Logos/logo_light.png";

const Header = ({ dark, onToggleTheme }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/team", label: "Team" },
    { to: "/events", label: "Events" },
    {
      label: "Virasat",
      hasDropdown: true,
      dropdownItems: [
        { to: "/virasat-2024", label: "Virasat 2024" },
        { to: "/virasat-2025", label: "Virasat 2025" },
      ],
    },
    { to: "/pixels", label: "Pixels" },
    { to: "/contact", label: "Contact Us" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleDropdownToggle = (index) =>
    setActiveDropdown(activeDropdown === index ? null : index);

  return (
    <header
      className={`${
        dark ? "bg-slate-900 text-white" : "bg-white text-gray-900"
      } transition-all duration-300 shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                src={dark ? dark_logo : light_logo}
                alt="Logo"
                className="h-10 md:h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.hasDropdown ? (
                  <div className="relative group">
                    <button
                      className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                        location.pathname.startsWith("/virasat")
                          ? dark
                            ? "text-orange-400 bg-slate-800"
                            : "text-orange-600 bg-orange-50"
                          : dark
                          ? "text-gray-300 hover:text-white hover:bg-slate-800"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onMouseEnter={() => setActiveDropdown(index)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className="transition-transform group-hover:rotate-180"
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg z-50 transition-all duration-200 ${
                        activeDropdown === index
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      } ${
                        dark
                          ? "bg-slate-800 border border-slate-700"
                          : "bg-white border border-gray-200"
                      }`}
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.dropdownItems?.map((dropItem, dropIndex) => (
                        <Link
                          key={dropIndex}
                          to={dropItem.to}
                          className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                            dark
                              ? "text-gray-300 hover:text-white hover:bg-slate-700"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          } ${dropIndex === 0 ? "rounded-t-md" : ""} ${
                            dropIndex === item.dropdownItems.length - 1
                              ? "rounded-b-md"
                              : ""
                          }`}
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.to
                        ? dark
                          ? "text-orange-400 bg-slate-800"
                          : "text-orange-600 bg-orange-50"
                        : dark
                        ? "text-gray-300 hover:text-white hover:bg-slate-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Theme + Mobile */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-md transition-all duration-200 ${
                dark
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-md transition-colors duration-200 ${
                dark
                  ? "text-gray-300 hover:text-white hover:bg-slate-800"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden border-t ${
              dark
                ? "border-slate-700 bg-slate-900"
                : "border-gray-200 bg-white"
            } transition-all duration-300`}
          >
            <nav className="py-4 space-y-1">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                          location.pathname.startsWith("/virasat")
                            ? dark
                              ? "text-orange-400 bg-slate-800"
                              : "text-orange-600 bg-orange-50"
                            : dark
                            ? "text-gray-300 hover:text-white hover:bg-slate-800"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === index && (
                        <div
                          className={`pl-4 ${
                            dark ? "bg-slate-800" : "bg-gray-50"
                          }`}
                        >
                          {item.dropdownItems?.map((dropItem, dropIndex) => (
                            <Link
                              key={dropIndex}
                              to={dropItem.to}
                              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                dark
                                  ? "text-gray-400 hover:text-white hover:bg-slate-700"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                              }`}
                            >
                              {dropItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.to}
                      className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        location.pathname === item.to
                          ? dark
                            ? "text-orange-400 bg-slate-800"
                            : "text-orange-600 bg-orange-50"
                          : dark
                          ? "text-gray-300 hover:text-white hover:bg-slate-800"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
