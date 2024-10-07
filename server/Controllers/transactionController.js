import Product from "../models/model.js";
import axios from "axios";

export const getTransactions = async (req, res) => {
  const { search = "" } = req.query;
  const page = 1,
    perPage = 10;
  const pageNum = parseInt(page);
  const perPageNum = parseInt(perPage);
  try {
    // let query = {};
    // if (search) {
    //   query = {
    //     $or: [
    //       { title: { $regex: search, $options: "i" } },
    //       { description: { $regex: search, $options: "i" } },
    //       { price: parseFloat(search) || { $exists: true } },
    //     ],
    //   };
    // }
    const totalItems = await Product.countDocuments(req.query);
    const transactions = await Product.find(req.query);

    res.json({
      Total: totalItems,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch " });
  }
};

export const seedData = async (req, res) => {
  try {
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
      await newProduct.save();
    }
    res.status(200).json({ message: "Data seeded !" });
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({ error: "Failed to seed data" });
  }
};
