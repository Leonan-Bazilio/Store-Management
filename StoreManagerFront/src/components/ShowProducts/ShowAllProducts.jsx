import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ShowAllProducts.module.css";

const ShowAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`${baseUrl}/api/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos Cadastrados</h1>
      <input
        type="text"
        placeholder="Pesquisar por nome do produto..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      {fetching ? (
        <p className={styles.loading}>Carregando produtos...</p>
      ) : (
        <div className={styles.productList}>
          {filteredProducts.map((prod) => (
            <div className={styles.productCard} key={prod.id}>
              <img
                src={`${baseUrl}/uploads/${prod.imagePath}`}
                alt={prod.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h4 className={styles.productName}>{prod.name}</h4>
                <p className={styles.productDescription}>{prod.description}</p>
                <p className={styles.productPrice}>
                  <strong>Preço:</strong> R$ {prod.sellingPrice.toFixed(2)}
                </p>
                <p className={styles.productStock}>
                  <strong>Estoque:</strong> {prod.stockQuantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAllProducts;
