import {
  getBarChart,
  getPieChart,
  getCombinedData,
  getStatistics,
} from "../Controllers/statisticsControllers";
import {
  seedData,
  getTransactions,
} from "../Controllers/transactionController";
import express from "express";
const router = express.Router();
router.get("/seed", seedData);

router.get("/transactions", getTransactions);

router.get("/statistics/:month", getStatistics);

router.get("/bar-chart/:month", getBarChart);

router.get("/pie-chart/:month", getPieChart);

router.get("/combined/:month", getCombinedData);

export default router;
