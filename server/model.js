import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    sold: { type: Boolean, default: false },
    dateOfSale: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
