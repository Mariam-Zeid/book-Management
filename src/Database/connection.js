import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/bookmanagment")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
