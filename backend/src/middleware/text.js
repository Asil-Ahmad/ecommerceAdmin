import cron from 'node-cron';
import Product from '../models/Product'; // Assuming you have a Product model

const checkAndRemoveExpiredSales = async () => {
  try {
    const products = await Product.find();

    for (const product of products) {
      const now = new Date();

      // Check if the sale should start
      if (product.saleStart && product.saleStart <= now) {
        product.salePrice = product.originalPrice * 0.9; // Example: 10% discount
        product.saleStart = null;
        await product.save();
        console.log(`Sale started for product: ${product.name}`);
      }

      // Check if the sale has expired
      if (product.saleEnd && product.saleEnd <= now) {
        product.salePrice = null;
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
  cron.schedule("* * * * *", async () => {
    console.log("Running scheduled task to check expired sales...");
    await checkAndRemoveExpiredSales();
  });
};