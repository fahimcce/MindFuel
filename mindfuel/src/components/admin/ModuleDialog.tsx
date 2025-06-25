import { X } from "lucide-react";
import React from "react";

interface ModuleDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: { title: string };
  setFormData: (data: { title: string }) => void;
  loading?: boolean;
  title?: string;
}

const ModuleDialog: React.FC<ModuleDialogProps> = ({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  loading,
  title = "Create New Module",
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl border border-slate-700/50 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700/50 transition-colors"
          aria-label="Close"
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="moduleTitle"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Module Title
              </label>
              <input
                id="moduleTitle"
                type="text"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white"
                value={formData.title}
                onChange={(e) => setFormData({ title: e.target.value })}
                placeholder="Enter module title"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300"
            >
              {loading ? "Saving..." : "Save Module"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModuleDialog;
