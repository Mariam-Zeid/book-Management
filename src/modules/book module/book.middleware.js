import { Book } from "../../Database/models/book.js";

export const isBookExist = async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  next();
};
