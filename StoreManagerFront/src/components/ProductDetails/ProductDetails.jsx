import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import InputField from "../InputField/InputField";
import axios from "axios";

const ProductDetails = ({ product, onClose, onAddStock }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [addStock, setAddStock] = useState();
  const [editingProduct, setEditingProduct] = useState(false);
  const [productData, setProductData] = useState({
    name: product.name,
    description: product.description,
    costPrice: product.costPrice,
    sellingPrice: product.sellingPrice,
    stockQuantity: product.stockQuantity,
    intermediateWarningQuantity: product.intermediateWarningQuantity,
    alertQuantity: product.alertQuantity,
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditing = () => {
    setEditingProduct((prev) => !prev);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );
    formData.append("image", image);
    handleEditing();

    try {
      await axios.put(`${baseUrl}/api/products/${product.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Produto atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.createDate}>
          {new Date(product.createdAt).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        {editingProduct ? (
          <form  className={styles.form}>
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
                    <img
                      className={styles.image}
                      src={`${baseUrl}/uploads/${product.imagePath}`}
                      alt={product.name}
                    />
                  )}
                </label>
              </div>
              <div className={styles.textInputs}>
                <InputField
                  type="text"
                  nameAndId="name"
                  textLabel="Nome do Produto"
                  value={productData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
                <InputField
                  type="textarea"
                  nameAndId="description"
                  textLabel="Descrição do Produto"
                  value={productData.description}
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
                value={productData.costPrice}
                onChange={handleChange}
                className={styles.input}
              />
              <InputField
                type="number"
                nameAndId="sellingPrice"
                textLabel="Preço de Venda"
                value={productData.sellingPrice}
                onChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <InputField
                type="number"
                nameAndId="stockQuantity"
                textLabel="Quantidade em Estoque"
                value={productData.stockQuantity}
                onChange={handleChange}
              />
              <InputField
                type="number"
                nameAndId="intermediateWarningQuantity"
                textLabel="Estoque Mínimo"
                value={productData.intermediateWarningQuantity}
                onChange={handleChange}
              />
              <InputField
                type="number"
                nameAndId="alertQuantity"
                textLabel="Quantidade de Alerta"
                value={productData.alertQuantity}
                onChange={handleChange}
              />
            </div>
          </form>
        ) : (
          <>
            <div className={styles.row1}>
              <img
                className={styles.image}
                src={`${baseUrl}/uploads/${product.imagePath}`}
                alt={product.name}
              />

              <div className={styles.textContent}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
            </div>
            <div className={styles.row2}>
              <div className={styles.divField}>
                <p>Preço de custo: </p>

                <p>R$ {product.costPrice},00</p>
              </div>
              <div className={styles.divField}>
                <p>Preço de venda </p>
                <p>R$ {product.sellingPrice},00</p>
              </div>
            </div>
            <div className={styles.row3}>
              <div className={styles.stockSection}>
                <div className={styles.divField}>
                  <p>Quantidade em Estoque: </p>
                  <p> {product.stockQuantity}</p>
                </div>

                <div className={styles.addStock}>
                  <InputField
                    type="number"
                    nameAndId="stockQuantity"
                    textLabel="Adicionar ao estoque"
                    value={addStock}
                    onChange={(e) => {
                      setAddStock(e.target.value);
                    }}
                    className={styles.inputStock}
                  />
                  <button className={styles.addButton} onClick={onAddStock}>
                    Adicionar
                  </button>
                </div>
              </div>
              <div className={styles.divField}>
                <p>Estoque minimo recomendado:</p>
                <p>{product.intermediateWarningQuantity}</p>
              </div>
              <div className={styles.divField}>
                <p>Estoque alerta: </p>
                <p>{product.alertQuantity}</p>
              </div>
            </div>
          </>
        )}
        <div
          className={`${
            editingProduct ? styles.divBtnsEditing : styles.divBtns
          }`}
        >
          <button className={styles.btnCancel} onClick={handleEditing}>
            Cancelar
          </button>
          <button
            className={styles.btnEdit}
            onClick={editingProduct ? handleUpdate : handleEditing}
          >
            {editingProduct ? "Salvar" : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
//Base funcionando, precisa criar os endpoints para edição e adicionar estoque no back e ajustar aqui, remover as redundancias ja que copiei muita coisa do productForm, ajustar o visual, deixar o modo de exibição e o de editar mais semelhantes
