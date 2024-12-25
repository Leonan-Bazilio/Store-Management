import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ShowAllProducts.module.css";
const ShowAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`${baseUrl}/api/products`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div>
      {fetching ? (
        <p>Carregando produtos...</p>
      ) : (
        <div>
          <h3>Lista de Produtos</h3>
          <div className={styles.divProductList}>
            {products.map((prod) => (
              <div className={styles.product} key={prod.id}>
                <img
                  src={`${baseUrl}/uploads/${prod.imagePath}`}
                  alt={prod.name}
                />
                <h4>{prod.name}</h4>
                <p>{prod.description}</p>
                <p>
                  <strong>Preço de Venda:</strong> R$ {prod.sellingPrice}
                </p>
                <p>
                  <strong>Estoque:</strong> {prod.stockQuantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowAllProducts;
