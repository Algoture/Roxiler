import Product from "../models/model.js";

export const getStatistics = async (req, res) => {
  const { month } = req.params;
  const start = new Date(`2021-${month}-01`);
  const end = new Date(`2021-${month}-31`);

  try {
    const soldItems = await Product.find({
      sold: true,
      dateOfSale: { $gte: start, $lt: end },
    });
    const allItems = await Product.find({
      dateOfSale: { $gte: start, $lt: end },
    });
    const totalSaleAmount = soldItems.reduce(
      (total, item) => total + item.price,
      0
    );
    const totalSoldItems = soldItems.length;
    const totalNotSoldItems = allItems.length - totalSoldItems;
    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};
export const getPieChart = async (req, res) => {
  const { month } = req.params;
  const start = new Date(`2021-${month}-01`);
  const end = new Date(`2021-${month}-31`);
  try {
    const products = await Product.find({
      dateOfSale: { $gte: start, $lt: end },
    });
    const categories = {};
    products.forEach((product) => {
      if (!categories[product.category]) {
        categories[product.category] = 1;
      } else {
        categories[product.category]++;
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pie chart data" });
  }
};
export const getBarChart = async (req, res) => {
  const { month } = req.params;
  const start = new Date(`2021-${month}-01`);
  const end = new Date(`2021-${month}-31`);

  try {
    const products = await Product.find({
      dateOfSale: { $gte: start, $lt: end },
    });

    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    products.forEach((product) => {
      const price = product.price;
      if (price >= 0 && price <= 100) priceRanges["0-100"]++;
      else if (price > 100 && price <= 200) priceRanges["101-200"]++;
      else if (price > 200 && price <= 300) priceRanges["201-300"]++;
      else if (price > 300 && price <= 400) priceRanges["301-400"]++;
      else if (price > 400 && price <= 500) priceRanges["401-500"]++;
      else if (price > 500 && price <= 600) priceRanges["501-600"]++;
      else if (price > 600 && price <= 700) priceRanges["601-700"]++;
      else if (price > 700 && price <= 800) priceRanges["701-800"]++;
      else if (price > 800 && price <= 900) priceRanges["801-900"]++;
      else if (price > 900) priceRanges["901-above"]++;
    });
    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bar chart data" });
  }
};
export const getCombinedData = async (req, res) => {
  const { month } = req.params;
  try {
    const [statisticsRes, barChartRes, pieChartRes] = await Promise.all([
      axios.get(`http://localhost:3000/api/statistics/${month}`),
      axios.get(`http://localhost:3000/api/bar-chart/${month}`),
      axios.get(`http://localhost:3000/api/pie-chart/${month}`),
    ]);
    res.json({
      statistics: statisticsRes.data,
      barChart: barChartRes.data,
      pieChart: pieChartRes.data,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
};
