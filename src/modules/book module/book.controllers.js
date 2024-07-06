import { Author } from "../../Database/models/author.js";
import { Book } from "../../Database/models/book.js";

export const getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Parse page number from query string, default to 1
  const limit = 3; // Number of documents per page

  const totalCount = await Book.countDocuments(); // Total count of documents

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  const books = await Book.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  // Add page number to each document
  const booksWithPage = books.map((book) => ({
    ...book.toObject(), // Convert Mongoose document to plain object
    page: page,
  }));

  res.json({
    books: booksWithPage,
    totalPages: totalPages,
    currentPage: page,
  });
};

export const createBook = async (req, res) => {
  const newBook = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };

  const existingBook = await Book.findOne({ title: newBook.title });
  if (existingBook) {
    return res.status(409).json({ message: "Book already exists" });
  }
  const book = await Book.create(newBook);
  const author = await Author.findOne({ name: req.body.author });
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  author.books.push(book._id);
  await author.save();
  res.json({ message: "Book created successfully" });
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  res.json(book);
};

export const updateBook = async (req, res) => {
  await Book.findByIdAndUpdate(req.params.bookId, req.body);
  res.json({ message: "Book updated successfully" });
};

export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  // remove book id from author's books array
  const author = await Author.findOne({ name: book.author });
  author.books = author.books.filter(
    (b) => b.toString() !== book._id.toString()
  );
  await author.save();
  await book.deleteOne();

  res.json({ message: "Book deleted successfully" });
};
