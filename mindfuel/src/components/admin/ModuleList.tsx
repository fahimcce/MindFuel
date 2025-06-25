import { Edit, Trash2, Plus } from "lucide-react";
import { TModule, TLecture } from "@/types";
import LectureList from "./LectureList";
import React, { useState } from "react";

interface ModuleListProps {
  modules: TModule[];
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onAddLecture: (moduleId: string) => void;
  editingModuleId: string;
  editModuleTitle: string;
  setEditModuleTitle: (title: string) => void;
  handleUpdateModule: (e: React.FormEvent) => void;
  setEditingModuleId: (id: string) => void;
  handleEditLecture: (lecture: TLecture) => void;
  editingLectureId: string;
  editLectureData: any;
  setEditLectureData: any;
  handleUpdateLecture: (e: React.FormEvent) => void;
  deleteLectureMutation: any;
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onEdit,
  onDelete,
  onAddLecture,
  editingModuleId,
  editModuleTitle,
  setEditModuleTitle,
  handleUpdateModule,
  setEditingModuleId,
  handleEditLecture,
  editingLectureId,
  editLectureData,
  setEditLectureData,
  handleUpdateLecture,
  deleteLectureMutation,
}) => (
  <div className="space-y-6">
    {modules.map((module) => {
      const isEditing = editingModuleId === module._id;
      return (
        <div
          key={module._id}
          className="rounded-xl border border-slate-700/50 overflow-hidden"
        >
          <div className="p-4 bg-slate-800/30 border-b border-slate-700/50">
            <div className="flex justify-between items-center">
              <div>
                {isEditing ? (
                  <form
                    onSubmit={handleUpdateModule}
                    className="flex items-center gap-2"
                  >
                    <input
                      className="px-2 py-1 rounded bg-slate-700 text-white"
                      value={editModuleTitle}
                      onChange={(e) => setEditModuleTitle(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 bg-slate-600 text-white rounded"
                      onClick={() => setEditingModuleId("")}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-white">
                      Module {module.moduleNumber}: {module.title}
                    </h3>
                    <p className="text-slate-400">
                      {module.lectures.length} lectures
                    </p>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(module._id, module.title)}
                  className="p-1 text-slate-400 hover:text-blue-400 rounded hover:bg-slate-700/50 transition-colors"
                  title="Edit Module"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(module._id)}
                  className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-700/50 transition-colors"
                  title="Delete Module"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onAddLecture(module._id)}
                  className="flex items-center px-3 py-1 text-sm text-white bg-blue-600/80 hover:bg-blue-500/80 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lecture
                </button>
              </div>
            </div>
          </div>
          <LectureList
            lectures={module.lectures}
            handleEditLecture={handleEditLecture}
            editingLectureId={editingLectureId}
            editLectureData={editLectureData}
            setEditLectureData={setEditLectureData}
            handleUpdateLecture={handleUpdateLecture}
            deleteLectureMutation={deleteLectureMutation}
          />
        </div>
      );
    })}
  </div>
);

export default ModuleList;
