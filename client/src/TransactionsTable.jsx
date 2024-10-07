import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("3");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/transactions`,
          {
            params: {
              search: search,
              page: page,
              perPage: perPage,
              month: month,
            },
          }
        );
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [search, page, month, perPage]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="table-container">
      <h2>Transaction Dashboard</h2>

      <select
        value={month}
        onChange={handleMonthChange}
        className="month-select"
      >
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search transactions..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>${transaction.price.toFixed(2)}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? "Yes" : "No"}</td>
                <td>
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    style={{ width: "50px" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-controls">
        <span>Page No : {page}</span>
        <div className="pageBtns">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <button onClick={handleNextPage}>Next</button>
        </div>
        <span>Per Page : 10 </span>
      </div>
    </div>
  );
};

export default TransactionsTable;
