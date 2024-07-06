import { Author } from "../../Database/models/author.js";
import { Book } from "../../Database/models/book.js";

export const getAllAuthors = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Parse page number from query string, default to 1
  const limit = 3; // Number of documents per page

  const totalCount = await Author.countDocuments(); // Total count of documents

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  const authors = await Author.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  // Add page number to each document
  const authorWithPage = authors.map((author) => ({
    ...author.toObject(), // Convert Mongoose document to plain object
    page: page,
  }));

  res.json({
    authors: authorWithPage,
    totalPages: totalPages,
    currentPage: page,
  });

  res.json(authors);
};

export const createAuthor = async (req, res) => {
  const newAuthor = {
    name: req.body.name,
    bio: req.body.bio,
    birthdate: new Date(req.body.birthdate),
  };

  const existingAuthor = await Author.findOne({ name: newAuthor.name });
  if (existingAuthor) {
    return res.status(409).json({ message: "Author already exists" });
  }

  await Author.create(newAuthor);
  res.json({ message: "Author created successfully" });
};

export const getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.authorId).populate({
    path: "books",
    select: "title -_id", // Only populate the 'title' field from the Book documents
  }); // Populate books field with actual book documents
  res.json(author);
};

export const updateAuthor = async (req, res) => {
  await Author.findByIdAndUpdate(req.params.authorId, req.body);
  res.json({ message: "Author updated successfully" });
};

export const deleteAuthor = async (req, res) => {
  const author = await Author.findById(req.params.authorId);

  // delete all books associated with the author when the author is deleted
  const books = await Book.find({ author: author.name });

  for (const book of books) {
    await Book.findByIdAndDelete(book._id);
  }

  await Author.findByIdAndDelete(req.params.authorId);

  res.json({ message: "Author deleted successfully" });
};
