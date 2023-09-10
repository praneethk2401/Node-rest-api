import express from "express"; // Importing express module

import mongoose from "mongoose"; // Importing mongoose for MongoDB interactions
import dotenv from "dotenv"; // Importing dotenv to manage environment variables
import helmet from "helmet"; // Importing helmet for secure HTTP headers
import morgan from "morgan"; // Importing morgan for logging
import userRoute from "./routes/users.js"; // Importing user routes
import authRoute from "./routes/auth.js"; // Importing authentication routes
import postRoute from "./routes/posts.js"; // Importing post routes

const app = express(); // Initializing express
const port = 3000;

dotenv.config(); // Configuring dotenv

async function connectToMongodb() {
  try {
      await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
  } catch (error) {
      console.error("Error connecting to MongoDB:", error);
  }
}
// Connecting to mongodb database using async and await functions
connectToMongodb();

//middleware
app.use(express.json()); // Using express.json middleware for parsing JSON requests
app.use(helmet()); // Using helmet middleware for secure HTTP headers
app.use(morgan("common")); // Using morgan middleware for logging

app.use("/api/auth", authRoute); // Using authentication routes
app.use("/api/users", userRoute); // Using user routes
app.use("/api/posts", postRoute); // Using post routes

app.listen(port, () => { // Starting the server on port 8800
  console.log(`Server is running on port ${port}`); // Log when server starts running
});
