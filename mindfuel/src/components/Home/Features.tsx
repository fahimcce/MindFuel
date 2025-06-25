import { BarChart2, Globe, GraduationCap, Video } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300">
              Why Learn With Us
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We've redefined digital education with features designed for real
            growth and measurable success.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="group relative p-8 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 border border-blue-500/30">
                <Video className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Immersive Content</h3>
              <p className="text-slate-300">
                Cinematic-quality lessons with interactive scenarios and
                real-world simulations.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative p-8 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6 border border-purple-500/30">
                <GraduationCap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Mastery Paths</h3>
              <p className="text-slate-300">
                Structured learning journeys curated by industry leaders and
                subject experts.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative p-8 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-6 border border-emerald-500/30">
                <BarChart2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Smart Analytics</h3>
              <p className="text-slate-300">
                AI-powered insights track your progress and optimize your
                learning curve.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative p-8 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-amber-600/20 rounded-lg flex items-center justify-center mb-6 border border-amber-500/30">
                <Globe className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Global Community</h3>
              <p className="text-slate-300">
                Connect with peers worldwide through collaborative projects and
                discussions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
              10K+
            </div>
            <div className="text-slate-300">Active Learners</div>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
              500+
            </div>
            <div className="text-slate-300">Expert Mentors</div>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 mb-2">
              95%
            </div>
            <div className="text-slate-300">Completion Rate</div>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300 mb-2">
              24/7
            </div>
            <div className="text-slate-300">Learning Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
