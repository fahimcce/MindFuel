import { model, Schema } from "mongoose";
import { TCourse } from "./Course.interface";

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    PurshasedUsers: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.virtual("modules", {
  ref: "Module",
  localField: "_id",
  foreignField: "courseId",
});

export const Course = model<TCourse>("Course", courseSchema);
