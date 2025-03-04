import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import inputrouter from "./routes/inputRouter.js";
import router from "./routes/emailRouter.js";


dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());


// Ensure MongoDB URL is loaded
const url = process.env.MONGO_URL;
if (!url) {
  console.error("MONGO_URL is missing in .env file!");
  process.exit(1);
}

console.log("MongoDB URL:", url); // Debugging

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  });

app.use(inputrouter);
app.use(router);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:5173");
});