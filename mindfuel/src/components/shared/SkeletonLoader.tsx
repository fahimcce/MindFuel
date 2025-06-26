export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
        >
          <div className="bg-slate-700 h-40 rounded mb-4"></div>
          <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-600 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-600 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-blue-700/60 rounded"></div>
        </div>
      ))}
    </div>
  );
}
