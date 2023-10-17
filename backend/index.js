import express from "express";
import { PORT, mongDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middlewarre for handling CORS policy
// Option - 01: Allow all origins with default of cos(*)
app.use(cors());

// Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     alloweHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongDBURL)
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log(`App listening to the ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
