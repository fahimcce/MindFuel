"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/FindUser";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-sm py-2 border-b border-slate-700/50"
          : "bg-slate-900 py-4"
      }`}
    >
      {/* Background gradient that's always present but covered when scrolled */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent h-full -z-10 transition-opacity duration-300 ${
          isScrolled ? "opacity-0" : "opacity-100"
        }`}
      ></div>

      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300">
              MINDFUEL
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/courses"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:bg-slate-800/50 px-3 py-2 rounded-lg"
          >
            Courses
          </Link>
          <Link
            href="/features"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:bg-slate-800/50 px-3 py-2 rounded-lg"
          >
            Features
          </Link>
          <Link
            href="/contact"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:bg-slate-800/50 px-3 py-2 rounded-lg"
          >
            Contact
          </Link>
          <Link
            href="/about-us"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:bg-slate-800/50 px-3 py-2 rounded-lg"
          >
            About Us
          </Link>
        </nav>

        {/* Login/Dashboard/Dropdown - Desktop */}
        <div className="hidden md:block relative">
          {user ? (
            <div className="relative inline-block">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    if (user.role === "admin") {
                      window.location.href = "/admin";
                    } else {
                      window.location.href = "/user/dashboard";
                    }
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  Dashboard
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      logOut();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-slate-700 rounded-lg transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              Join Now
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-800/50"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            <Link
              href="/courses"
              className="text-slate-300 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              Learning Paths
            </Link>
            <Link
              href="/features"
              className="text-slate-300 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-slate-300 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-slate-300 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-700/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            {user ? (
              <>
                <Link
                  href="/user"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg text-center mt-2 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logOut();
                    toggleMobileMenu();
                  }}
                  className="bg-red-600 text-white font-medium py-3 px-4 rounded-lg text-center mt-2 hover:bg-red-500 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg text-center mt-2 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
