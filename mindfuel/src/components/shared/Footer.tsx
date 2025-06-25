"use client";

import {
  BookOpen,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Home,
  User,
  FileText,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">
                EduPlatform
              </span>
            </div>
            <p className="text-slate-400">
              The best online learning platform for mastering modern
              technologies.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#"
                  className="flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-slate-400">
              Subscribe to get updates on new courses and features.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white w-full"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-r-lg hover:from-blue-500 hover:to-indigo-500 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} MindFUEL. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
