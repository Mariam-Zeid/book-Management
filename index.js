import express from "express";
import "./src/Database/connection.js";
import { bookRouter } from "./src/modules/book module/book.routes.js";
import { authorRouter } from "./src/modules/author module/author.routes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
