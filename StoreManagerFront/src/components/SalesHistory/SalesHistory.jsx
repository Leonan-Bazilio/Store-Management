import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SalesHistory.module.css";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("http://localhost:8080/sales");
        setSales(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSales();
  }, []);

  const filteredSales = sales.filter((sale) => {
    const saleDate = new Date(sale.saleDate);
    return (
      (!startDate || new Date(startDate) <= saleDate) &&
      (!endDate || saleDate <= new Date(endDate))
    );
  });

  return (
    <div className={styles.salesHistory}>
      <div className={styles.filters}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <ul>
        {filteredSales.map((sale) => (
          <li key={sale.id}>
            <h3>Venda #{sale.id}</h3>
            <p>Data: {new Date(sale.saleDate).toLocaleDateString()}</p>
            <ul>
              {sale.items.map((item) => (
                <li key={item.product.id}>
                  {item.product.name} - Quantidade: {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesHistory;
