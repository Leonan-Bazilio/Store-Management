import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ShowAllProducts.module.css";
import InputField from "../InputField/InputField";
const ShowAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setFetching(true);
      try {
        const response = await axios.get(`${baseUrl}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos Cadastrados</h1>
      <InputField
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
                <h3 className={styles.productName}>{prod.name}</h3>
                <p className={styles.productDescription}>
                  {truncateDescription(prod.description, 40)}
                </p>
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
