import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LowStock.module.css";

const LowStock = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const lowStock = response.data.filter(
          (product) =>
            product.stockQuantity < product.intermediateWarningQuantity
        );
        setLowStockProducts(lowStock);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLowStockProducts();
  }, []);

  return (
    <div className={styles.lowStock}>
      <h2>Produtos com Estoque Baixo</h2>
      <ul>
        {lowStockProducts.map((product) => (
          <li key={product.id}>
            {product.name} - Estoque: {product.stockQuantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStock;