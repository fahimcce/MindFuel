import { MonitorPlay, Headphones, Award, Code2 } from "lucide-react";

export function LearningExperience() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Column - Visual Placeholder */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 aspect-video flex items-center justify-center">
              <MonitorPlay className="h-16 w-16 text-blue-400" />
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-white mb-8">
              Premium Learning Experience
            </h2>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30">
                  <Headphones className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Interactive Content
                  </h3>
                  <p className="text-slate-400">
                    Engaging videos, quizzes, and coding exercises
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                  <Code2 className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Real-World Projects
                  </h3>
                  <p className="text-slate-400">
                    Build portfolio-ready applications
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="bg-green-600/20 p-3 rounded-lg border border-green-500/30">
                  <Award className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Certification
                  </h3>
                  <p className="text-slate-400">
                    Earn verifiable completion certificates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
