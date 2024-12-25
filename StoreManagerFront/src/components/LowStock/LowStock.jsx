import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LowStock.module.css";

const LowStock = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products`);
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
