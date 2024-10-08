import React, { useState } from "react";
import TransactionsTable from "./TransactionsTable";
import Statistics from "./Statistics";
import BarCharts from "./BarCharts";
import Months from "./Months";
function App() {
  const [month, setMonth] = useState(3);
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <main>
      <Months month={month} handleMonthChange={handleMonthChange} />
      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarCharts month={month} />
    </main>
  );
}

export default App;
