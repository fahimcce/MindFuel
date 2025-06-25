"use client";

import {
  Rocket,
  BrainCircuit,
  Users,
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Fuel Your <span className="text-blue-400">Mind</span>, Transform
            Your Future
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            MINDFUEL is revolutionizing online education through immersive,
            project-based learning experiences.
          </p>
          <Link href="/courses">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
              Explore Courses
            </button>
          </Link>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 aspect-video flex items-center justify-center">
              <Rocket className="h-16 w-16 text-blue-400" />
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Story</span>
            </h2>
            <p className="text-slate-400 mb-4">
              Founded in 2023, MINDFUEL began as a passion project between
              educators and tech professionals who believed learning should be
              engaging, practical, and accessible to everyone.
            </p>
            <p className="text-slate-400 mb-4">
              We noticed traditional online courses often left students with
              theoretical knowledge but no practical skills. MINDFUEL was
              created to bridge that gap.
            </p>
            <p className="text-slate-400">
              Today, we serve over 50,000 learners worldwide with our unique
              project-driven curriculum.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              The <span className="text-blue-400">MINDFUEL</span> Difference
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Why thousands of learners choose us for their educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all">
              <div className="w-14 h-14 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 border border-blue-500/30">
                <BrainCircuit className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Cognitive Science-Based
              </h3>
              <p className="text-slate-400">
                Courses designed using proven learning techniques to maximize
                retention and understanding.
              </p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all">
              <div className="w-14 h-14 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6 border border-purple-500/30">
                <BookOpen className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Project-Centric
              </h3>
              <p className="text-slate-400">
                Learn by building real applications, not just watching videos.
              </p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-green-500/50 transition-all">
              <div className="w-14 h-14 bg-green-600/20 rounded-lg flex items-center justify-center mb-6 border border-green-500/30">
                <GraduationCap className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Career-Focused
              </h3>
              <p className="text-slate-400">
                Curriculum designed with input from industry leaders and hiring
                managers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Meet The <span className="text-blue-400">Team</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Passionate educators and industry experts fueling your learning
            journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Forhadul Islam Fahim",
              role: "Founder & CEO",
              expertise: "EdTech Innovation",
            },
            {
              name: "Jamila Khatun",
              role: "Head of Learning",
              expertise: "Curriculum Design",
            },
            {
              name: "Mamun Al Bakkar",
              role: "CTO",
              expertise: "Learning Platforms",
            },
            {
              name: "Nurullah Hasan",
              role: "Lead Instructor",
              expertise: "Full-Stack Development",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 text-center"
            >
              <div className="w-24 h-24 mx-auto bg-slate-700 rounded-full mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-blue-400 mb-2">{member.role}</p>
              <p className="text-slate-400 text-sm">{member.expertise}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/40 to-indigo-900/40">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to <span className="text-blue-400">Fuel</span> Your Mind?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Join thousands of learners transforming their careers with MINDFUEL
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <button className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-4">
                Browse Courses
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
