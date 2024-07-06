import { Author } from "../../Database/models/author.js";

export const isAuthorExist = async (req, res, next) => {
  const author = await Author.findById(req.params.authorId);
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  next();
};
