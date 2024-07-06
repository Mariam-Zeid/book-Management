import mongoose from "mongoose";
import { version } from "os";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  __v: { type: Number, select: false },
});

export const Book = mongoose.model("Book", bookSchema);
