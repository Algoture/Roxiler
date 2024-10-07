import axios from "axios";
import mongoose from "mongoose";
import { Product } from "./model.js";
export const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export const seedData = async () => {
  try {
    const existingData = await Product.countDocuments();
    if (existingData > 0) {
      console.log("Data already seeded.");
      return;
    }
    const { data } = await axios.get(process.env.GIVEN_API_URL);
    for (let product of data) {
      const newProduct = new Product({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        sold: product.sold,
        dateOfSale: new Date(product.dateOfSale),
      });
      await Product.create(newProduct);
    }
    console.log("Data seeded !");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
