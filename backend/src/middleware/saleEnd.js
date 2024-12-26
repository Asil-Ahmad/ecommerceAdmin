import productModel from "../models/productModel.js";

// Middleware to check and remove expired sales
const checkExpiredSales = async (req, res, next) => {
  try {
    const now = new Date();

    // Find products with expired sales
    const expiredSales = await productModel.find({
      saleEnd: { $lt: now },
      salePrice: { $ne: null },
    });

    if (expiredSales.length > 0) {
      // Update each product to remove the sale price
      for (const product of expiredSales) {
        product.salePrice = null;
        product.saleStart = null;
        product.saleEnd = null;
        await product.save();
        console.log(`Sale expired for product: ${product.name}`);
      }
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking expired sales:", error);
    return res.status(500).json({ message: "Error handling expired sales", error });
  }
};

export default checkExpiredSales;
