import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import { seedInitialProducts } from "./services/productService.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Failed to connect!", err));

// Seed the products to database
seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.listen(port, () => {
  console.log(`Server is running at:http://127.0.0.1:${port} `);
});
