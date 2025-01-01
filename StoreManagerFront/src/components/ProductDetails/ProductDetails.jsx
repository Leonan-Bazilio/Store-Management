import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import InputField from "../InputField/InputField";

const ProductDetails = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{product.name}</h1>
      </div>
    </div>
  );
};

export default ProductDetails;
