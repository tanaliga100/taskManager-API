import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name must be provided"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", TaskSchema);
export default Task;
