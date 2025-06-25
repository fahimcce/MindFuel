import { X } from "lucide-react";
import { TCourse } from "@/types";
import { useState } from "react";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    title: string;
    description: string;
    price: string;
    thumbnail: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      price: string;
      thumbnail: string;
    }>
  >;
  editingCourse: TCourse | null;
};

export default function CourseFormDialog({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingCourse,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData({ ...formData, thumbnail: url });
    } catch (err) {
      alert("Image upload failed");
    }
    setUploading(false);
  };

  // Wrap the onSubmit to handle submitting state
  const handleFormSubmit = async (e: React.FormEvent) => {
    setSubmitting(true);
    try {
      await onSubmit(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl border border-slate-700/50 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-2 cursor-pointer">
            {editingCourse ? "Edit Course" : "Create New Course"}
          </h2>
          <p className="text-slate-400 mb-6">
            {editingCourse
              ? "Update the course details below."
              : "Fill in the course details below."}
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Price (৳)
              </label>
              <input
                id="price"
                type="number"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Thumbnail Image
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="w-full cursor-pointer px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                onChange={handleThumbnailChange}
              />
              {uploading && (
                <p className="text-blue-400 text-xs mt-1">
                  Uploading...please wait
                </p>
              )}
              {formData.thumbnail && (
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail Preview"
                  className="mt-2 h-24 rounded"
                />
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center"
              >
                {submitting || uploading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {editingCourse
                      ? "Updating Course..."
                      : "Creating Course..."}
                  </span>
                ) : editingCourse ? (
                  "Update Course"
                ) : (
                  "Create Course"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
