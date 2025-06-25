export default function Loader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-slate-300">Loading courses...</p>
      </div>
    </div>
  );
}
