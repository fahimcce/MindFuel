import { uploadFileToUploadcare } from "@/utils/uploadFileToUploadcare";
import { X } from "lucide-react";
import React, { useState } from "react";

interface LectureDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: { title: string; videoUrl: string; pdfNotes: string };
  setFormData: (data: {
    title: string;
    videoUrl: string;
    pdfNotes: string;
  }) => void;
  loading?: boolean;
  title?: string;
}

const LectureDialog: React.FC<LectureDialogProps> = ({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  loading,
  title = "Create New Lecture",
}) => {
  const [pdfUploading, setPdfUploading] = useState(false);

  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setPdfUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFileToUploadcare(files[i]);
        urls.push(url);
      }
      // Append to existing pdfNotes (if any)
      const existing = formData.pdfNotes ? formData.pdfNotes.split("\n") : [];
      setFormData({
        ...formData,
        pdfNotes: [...existing, ...urls].join("\n"),
      });
    } catch (err) {
      alert("PDF upload failed");
    }
    setPdfUploading(false);
  };

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
                htmlFor="lectureTitle"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Lecture Title
              </label>
              <input
                id="lectureTitle"
                type="text"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter lecture title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="videoUrl"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Video URL (YouTube)
              </label>
              <input
                id="videoUrl"
                type="text"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="pdfNotes"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Upload PDF Notes (one or more)
              </label>
              <input
                type="file"
                accept="application/pdf"
                multiple
                className="mt-2 block w-full text-white cursor-pointer"
                onChange={handlePdfChange}
                disabled={pdfUploading}
              />
              {pdfUploading && (
                <p className="text-blue-400 text-xs mt-1">Uploading PDFs...</p>
              )}
              {formData.pdfNotes && (
                <div className="text-xs text-slate-400 mt-2">
                  {formData.pdfNotes.split("\n").length} PDF
                  {formData.pdfNotes.split("\n").length > 1 ? "s" : ""} uploaded
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || pdfUploading}
              className="w-full cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300"
            >
              {loading || pdfUploading ? "Saving..." : "Save Lecture"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LectureDialog;
