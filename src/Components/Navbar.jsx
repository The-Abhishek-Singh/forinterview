"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogIn } from "lucide-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollTop(scrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Close menu when clicking a link on mobile
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  const items = [
    { title: "Home", link: "/" },
  { title: "Features", link: "/features" },
  { title: "Pricing", link: "/pricing" },
  { title: "Templates", link: "/templates" },
  { title: "Contact", link: "/contact" }
  ];
  return (
    <nav
      className={`w-full  mb-4 bg-opacity-90 fixed  top-0 left-0 transition-all duration-300 backdrop-blur-lg ease-in-out z-50 text-black ${
        isVisible
  ? "opacity-100 pointer-events-auto transition-opacity duration-500 ease-in-out"
  : "opacity-0 transition-opacity duration-500 ease-in-out delay-200 pointer-events-none "
      }`}
    >
      <div className="w-full px-2 md:px-4 border-b border-green-400">
        <div className="flex h-20 items-center justify-between lg:justify-around">
          {/* Left section */}
          <div className="flex items-center h-full w-[200px] xl:w-[250px]">
            <h1 className="text-4xl text-black " >𝓝𝓸𝓽𝓲𝓺𝓾𝓮</h1>
          </div>
          {/* Center section - Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-6 mr-52">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="relative py-1 text-xs xl:text-sm font-medium text-black hover:text-green-400 group"
              >
                <span>{item.title}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
          {/* Right section */}
          <div className="flex items-center gap-2 md:gap-4">
          
            <Link href="/Login">
           
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="p-6 md:p-2 rounded-lg text-gray-100 lg:hidden bg-transparent border border-green-500 hover:bg-green-500 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`fixed inset-x-0 top-20 bg-black border-b border-gray-200 lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          style={{
            maxHeight: isMenuOpen ? "calc(100vh - 5rem)" : "0",
            overflow: "hidden"
          }}
        >
          <div className="px-4 py-2 space-y-1 mt-2 mb-4">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-100 hover:text-red-400 hover:bg-gray-900 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;