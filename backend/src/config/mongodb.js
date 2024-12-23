import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("connected to db");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
  // (process.env.MONGODB_URL);
};

export default connectDB;
