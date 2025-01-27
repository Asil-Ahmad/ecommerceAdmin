import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import "dotenv/config";
import productRouter from "./src/routes/productRoute.js";
import task from "./src/middleware/task.js";
import { checkExpiredSalesMiddleware, startCronJob } from "./src/middleware/checkExpiredSales.js";
import categoryRouter from "./src/routes/categoryRoute.js";
import headerRouter from "./src/routes/headerRoute.js";
import homepageRouter from "./src/routes/homepageRoute.js";
import carouselRouter from "./src/routes/carouselRoute.js";
import brandRouter from "./src/routes/brandRoute.js";
import aboutPageRouter from "./src/routes/aboutPage/aboutPageRoute.js";
import aboutPageFeatureRouter from "./src/routes/aboutPage/aboutPageFeatureRoute.js";
import aboutPage3Router from "./src/routes/aboutPage/aboutPage3Route.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(checkExpiredSalesMiddleware);
// startCronJob();
connectDB();
connectCloudinary();

// Use userRouter for all /api/user routes

app.get("/", (req, res) => res.json({ message: "Connected to API " }));
// app.use("/api/user", userRouter);

app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);

//For layout only
app.use("/api/layout", headerRouter);
app.use("/api/layout", homepageRouter);
app.use("/api/layout", carouselRouter);
app.use("/api/layout", brandRouter);

//For About Page
app.use("/api/aboutPage", aboutPageRouter);
app.use("/api/aboutFeaturePage", aboutPageFeatureRouter);
app.use("/api/aboutPage3", aboutPage3Router);
// app.use("/api/order", orderRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
