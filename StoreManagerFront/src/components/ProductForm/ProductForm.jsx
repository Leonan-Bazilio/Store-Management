import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductForm.module.css";
import InputField from "../InputField/InputField";

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

  const baseUrl = import.meta.env.VITE_BASE_URL;

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

      alert("Produto cadastrado com sucesso");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Adicionar Produto</h2>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <label htmlFor="fileInput" className={styles.imageLabel}>
            <input
              type="file"
              id="fileInput"
              className={styles.imageInput}
              onChange={handleImageChange}
            />

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
        <div className={styles.textInputs}>
          <InputField
            type="text"
            nameAndId="name"
            textLabel="Nome do Produto"
            value={product.name}
            onChange={handleChange}
            className={styles.input}
          />
          <InputField
            type="textarea"
            nameAndId="description"
            textLabel="Descrição do Produto"
            value={product.description}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
      </div>
      <div className={styles.row}>
        <InputField
          type="number"
          nameAndId="costPrice"
          textLabel="Preço de Custo"
          value={product.costPrice}
          onChange={handleChange}
          className={styles.input}
        />
        <InputField
          type="number"
          nameAndId="sellingPrice"
          textLabel="Preço de Venda"
          value={product.sellingPrice}
          onChange={handleChange}
        />
      </div>
      <div className={styles.row}>
        <InputField
          type="number"
          nameAndId="stockQuantity"
          textLabel="Quantidade em Estoque"
          value={product.stockQuantity}
          onChange={handleChange}
        />
        <InputField
          type="number"
          nameAndId="intermediateWarningQuantity"
          textLabel="Estoque Mínimo"
          value={product.intermediateWarningQuantity}
          onChange={handleChange}
        />
        <InputField
          type="number"
          nameAndId="alertQuantity"
          textLabel="Quantidade de Alerta"
          value={product.alertQuantity}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Cadastrar Produto
      </button>
    </form>
  );
};

export default ProductForm;
