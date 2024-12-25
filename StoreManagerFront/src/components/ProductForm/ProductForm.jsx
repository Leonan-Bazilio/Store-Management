import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductForm.module.css";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    stockQuantity: "",
    intermediateWarningQuantity: "",
    alertQuantity: "",
  });
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    formData.append("image", image);

    try {
      await axios.post(`${baseUrl}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts();
      alert("produto cadastrado com sucesso");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("erro ao cadastrar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Adicionar Produto</h2>
      <div className={`${styles.row} ${styles.row1}`}>
        <div className={styles.divImage}>
          <input
            className={styles.imageFile}
            type="file"
            name="imageFile"
            id="fileInput"
            onChange={handleImageChange}
          />
          <label htmlFor="fileInput" className={styles.fileLabel}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Imagem Selecionada"
                className={styles.previewImage}
              />
            ) : (
              <span>Selecione uma imagem</span>
            )}
          </label>
        </div>
        <div className={styles.divNameAndDescription}>
          <input
            className={styles.name}
            type="text"
            name="name"
            placeholder="Nome"
            value={product.name}
            onChange={handleChange}
          />
          <textarea
            className={styles.description}
            name="description"
            placeholder="Descrição"
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className={`${styles.row} ${styles.row2}`}>
        <input
          className={styles.costPrice}
          type="number"
          name="costPrice"
          placeholder="Preço de Custo"
          value={product.costPrice}
          onChange={handleChange}
        />
        <input
          className={styles.sellingPrice}
          type="number"
          name="sellingPrice"
          placeholder="Preço de Venda"
          value={product.sellingPrice}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.row} ${styles.row3}`}>
        <input
          className={styles.stockQuantity}
          type="number"
          name="stockQuantity"
          placeholder="Quantidade em Estoque"
          value={product.stockQuantity}
          onChange={handleChange}
        />
        <input
          className={styles.midQuantity}
          type="number"
          name="intermediateWarningQuantity"
          placeholder="Estoque Mínimo"
          value={product.intermediateWarningQuantity}
          onChange={handleChange}
        />
        <input
          className={styles.alertQuantity}
          type="number"
          name="alertQuantity"
          placeholder="Quantidade de Alerta"
          value={product.alertQuantity}
          onChange={handleChange}
        />
      </div>
      <button className={styles.button} type="submit">
        Cadastrar Produto
      </button>
    </form>
  );
};

export default ProductForm;
