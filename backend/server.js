import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import "dotenv/config";
import productRouter from "./src/routes/productRoute.js";
import checkExpiredSales from "./src/middleware/saleEnd.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(checkExpiredSales);

connectDB();
connectCloudinary();
// Use userRouter for all /api/user routes

app.get("/", (req, res) => res.json({ message: "Connected to API " }));
// app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
