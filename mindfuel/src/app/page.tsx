"use client";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import { HowItWorks } from "@/components/Home/HowItWorks";
import { LearningExperience } from "@/components/Home/LearningExperience";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white">
      <Hero />

      <Features />
      <HowItWorks />
      <LearningExperience />
    </div>
  );
}
