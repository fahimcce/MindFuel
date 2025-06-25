import { Rocket } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-6 py-2 bg-blue-600/20 rounded-full border border-blue-400/50 mb-6">
            <Rocket className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium text-blue-200">
              Elevate Your Learning Journey
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-300">
            Unlock Your Potential
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
            Transform your skills with our cutting-edge platform featuring
            immersive courses, expert mentorship, and career-aligned pathways.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <>
              <Link
                href="/register"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Begin Your Journey
              </Link>
              <Link
                href="/courses"
                className="px-8 py-4 rounded-lg border-2 border-slate-600 hover:border-blue-400 font-bold text-lg hover:text-blue-300 transition-colors duration-300"
              >
                Explore Courses
              </Link>
            </>
          </div>
        </div>
      </div>
    </section>
  );
}
