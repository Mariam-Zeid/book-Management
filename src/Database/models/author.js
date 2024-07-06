import mongoose from "mongoose";
import { Book } from "./book.js";

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

export const Author = mongoose.model("Author", authorSchema);
