import cron from "node-cron";
import productModel from "../models/productModel.js";

//todo this check Function to check and remove expired sales
const checkAndRemoveExpiredSales = async () => {
  try {
    const now = new Date();

    // Find products with expired sales
    const expiredSales = await productModel.find({
      saleEnd: { $lt: now },
      salePrice: { $ne: null },
    });
    console.log(expiredSales);
    

    if (expiredSales.length > 0) {
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
};
export default checkAndRemoveExpiredSales;

// Middleware to run expired sales check on incoming requests
export const checkExpiredSalesMiddleware = async (req, res, next) => {
  await checkAndRemoveExpiredSales();
  next(); // Proceed to the next middleware or route handler
};

// Schedule the task to run every hour using node-cron
export const startCronJob = () => {
  cron.schedule("* * * * * *", async () => {
    console.log("Running scheduled task to check expired sales...");
    await checkAndRemoveExpiredSales();
  });
};
