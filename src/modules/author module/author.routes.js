import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "./author.controllers.js";
import { isAuthorExist } from "./author.middleware.js";

export const authorRouter = Router();

authorRouter.route("/").get(getAllAuthors).post(createAuthor);
authorRouter
  .route("/:authorId")
  .get(isAuthorExist, getAuthorById)
  .patch(isAuthorExist, updateAuthor)
  .delete(isAuthorExist, deleteAuthor);
