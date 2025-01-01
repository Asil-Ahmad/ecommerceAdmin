import cron from "node-cron";
import productModel from "../models/productModel.js";

const task = cron.schedule("* * * * * *", async (req, res, next) => {
  // console.log("Every Running scheduled task to check expired sales...");
  try {
    const now = Date.now();

    // Update all expired sales in one operation
    const expiredSales = await productModel.find({
      saleEnd: { $lt: now },
      salePrice: { $ne: null },
    });
    if (expiredSales.length > 0) {
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
      // Update each product to remove the sale price
      for (const product of expiredSales) {
        product.salePrice = null;
        product.saleStart = null;
        product.saleEnd = null;
        await product.save();
        console.log(`Sale expired for product: ${product.name}`);
      }
    }
  } catch (error) {
    console.error("Error checking expired sales:", error);
  }
  next(); // Proceed to the next middleware or route handler
});

export default task;
