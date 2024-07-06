import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./book.controllers.js";
import { isBookExist } from "./book.middleware.js";
import { isAuthorExist } from "../author module/author.middleware.js";

export const bookRouter = Router();

bookRouter.route("/").get(getAllBooks).post(createBook);
bookRouter
  .route("/:bookId")
  .get(isBookExist, getBookById)
  .patch(isBookExist, updateBook)
  .delete(isBookExist, isAuthorExist, deleteBook);
