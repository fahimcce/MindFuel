import { model, Schema } from "mongoose";
import { TUser } from "./Auth.interface";

const userModelSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<TUser>("User", userModelSchema);
