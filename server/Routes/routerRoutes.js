import {
  getBarChart,
  getPieChart,
  getCombinedData,
  getStatistics,
  getCategories,
} from "../Controllers/statisticsControllers.js";
import {
  seedData,
  getTransactions,
} from "../Controllers/transactionController.js";
import express from "express";
const router = express.Router();

router.get("/seed", seedData);

router.get("/transactions", getTransactions);

router.get("/statistics/:month", getStatistics);

router.get("/bar-chart/:month", getBarChart);

router.get("/pie-chart/:month", getPieChart);

router.get("/combined/:month", getCombinedData);

router.get("/categories/:month", getCategories);

export default router;
