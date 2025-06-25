import { Edit, Trash2, Video } from "lucide-react";
import { TLecture } from "@/types";
import React from "react";

interface LectureListProps {
  lectures: TLecture[];
  handleEditLecture: (lecture: TLecture) => void;
  editingLectureId: string;
  editLectureData: any;
  setEditLectureData: any;
  handleUpdateLecture: (e: React.FormEvent) => void;
  deleteLectureMutation: any;
}

const LectureList: React.FC<LectureListProps> = ({
  lectures,
  handleEditLecture,
  editingLectureId,
  editLectureData,
  setEditLectureData,
  handleUpdateLecture,
  deleteLectureMutation,
}) => (
  <div className="p-4">
    {lectures.length === 0 ? (
      <p className="text-slate-500 italic">No lectures in this module yet.</p>
    ) : (
      <div className="space-y-2">
        {lectures.map((lecture) =>
          editingLectureId === lecture._id ? (
            <form
              key={lecture._id}
              onSubmit={handleUpdateLecture}
              className="flex flex-col gap-2 bg-slate-700/30 rounded-lg p-3 mb-2"
            >
              <input
                className="px-2 py-1 rounded bg-slate-700 text-white"
                value={editLectureData.title}
                onChange={(e) =>
                  setEditLectureData((prev: any) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
              />
              <input
                className="px-2 py-1 rounded bg-slate-700 text-white"
                value={editLectureData.videoUrl}
                onChange={(e) =>
                  setEditLectureData((prev: any) => ({
                    ...prev,
                    videoUrl: e.target.value,
                  }))
                }
                required
              />
              <textarea
                className="px-2 py-1 rounded bg-slate-700 text-white"
                value={editLectureData.pdfNotes}
                onChange={(e) =>
                  setEditLectureData((prev: any) => ({
                    ...prev,
                    pdfNotes: e.target.value,
                  }))
                }
                rows={2}
                placeholder="PDF URLs, one per line"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-2 py-1 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-2 py-1 bg-slate-600 text-white rounded"
                  onClick={() =>
                    setEditLectureData({
                      title: "",
                      videoUrl: "",
                      pdfNotes: "",
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div
              key={lecture._id}
              className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Video className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="font-medium text-white">{lecture.title}</p>
                  <p className="text-sm text-slate-400">
                    {lecture.pdfNotes.length} PDF notes
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-1 text-slate-400 hover:text-blue-400 rounded hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleEditLecture(lecture)}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-700/50 transition-colors"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this lecture?")
                    ) {
                      deleteLectureMutation.mutate(lecture._id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    )}
  </div>
);

export default LectureList;
