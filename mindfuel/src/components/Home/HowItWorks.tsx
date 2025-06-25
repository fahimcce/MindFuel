import { User, BookOpen, Aperture } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Learning in 3 Simple Steps
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Get started quickly with our streamlined onboarding process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 border border-blue-500/30">
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Create Account
            </h3>
            <p className="text-slate-400">
              Quick signup with email or social login
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 border border-purple-500/30">
              <BookOpen className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Choose Course
            </h3>
            <p className="text-slate-400">
              Browse our catalog of expert-curated courses
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-green-500/50 transition-all">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4 border border-green-500/30">
              <Aperture className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Start Learning
            </h3>
            <p className="text-slate-400">
              Dive into interactive lessons immediately
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
