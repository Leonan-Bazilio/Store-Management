import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import InputField from "../InputField/InputField";

const ProductDetails = ({ product, onClose, onAddStock }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [addStock, setAddStock] = useState();
  const [editingProduct, setEditingProduct] = useState(true);

  const handleEditing = () => {
    setEditingProduct((prev) => !prev);
    //colocar alteração no conteudo para input amanha, partiu dormir
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
                placeholder="Adicionar ao estoque"
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
        <div
          className={`${
            editingProduct ? styles.divBtnsEditing : styles.divBtns
          }`}
        >
          <button className={styles.btnCancel} onClick={handleEditing}>
            Cancelar
          </button>
          <button className={styles.btnEdit} onClick={handleEditing}>
            {editingProduct ? "Salvar" : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
