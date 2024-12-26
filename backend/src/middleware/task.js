import cron from "node-cron";
import productModel from "../models/productModel.js";

const task = cron.schedule("* * * * * *", async () => {
  // Runs every hour
  try {
    const now = Date.now();

    // Update all expired sales in one operation
    const result = await productModel.updateMany(
      {
        saleEnd: { $lt: now },
        salePrice: { $ne: null },
      },
      {
        $set: { salePrice: null, saleStart: null, saleEnd: null },
      }
    );

    console.log(`Expired sales updated ${result} for products.`);
  } catch (error) {
    console.error("Error checking expired sales:", error);
  }
});

export default task;
