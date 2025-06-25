import { model, Schema } from "mongoose";
import { TModule } from "./Module.interface";

const moduleSchema = new Schema<TModule>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

moduleSchema.virtual("lectures", {
  ref: "Lecture",
  localField: "_id",
  foreignField: "moduleId",
});

export const Module = model<TModule>("Module", moduleSchema);
