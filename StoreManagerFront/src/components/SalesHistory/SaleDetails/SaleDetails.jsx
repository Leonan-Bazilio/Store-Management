import { useState } from "react";
import styles from "./SaleDetails.module.css";

const SaleDetails = ({ sale }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [saleData, setSaleData] = useState(sale);
  const [discount, setDiscount] = useState(sale.discount);

  const handleQuantityChange = (id, value) => {
    if (value >= 1) {
      setSaleData({
        ...saleData,
        items: saleData.items.map((item) =>
          item.product.id === id ? { ...item, quantity: value } : item
        ),
      });
    }
  };

  const increaseQuantity = (id) => {
    console.log(saleData);
    console.log(id);
    setSaleData({
      ...saleData,
      items: saleData.items.map((item) =>
        item.product.id == id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  const decreaseQuantity = (id) => {
    setSaleData({
      ...saleData,
      items: saleData.items.map((item) =>
        item.product.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    });
  };

  const removeFromSalee = (id) => {
    setSaleData({
      ...saleData,
      items: saleData.items.filter((item) => item.product.id !== id),
    });
  };

  return (
    <div className={styles.container}>
      <ul className={styles.containerItems}>
        {saleData.items.map((item) => (
          <div key={item.product.id} className={styles.cartItem}>
            <img
              src={`${baseUrl}/uploads/${item.product.imagePath}`}
              alt={item.product.name}
              className={styles.cartProductImage}
            />
            <div className={styles.cartProductInfo}>
              <span>{item.product.name}</span>
              <p>{item.product.description}</p>
              <span>Preço: R$ {item.product.sellingPrice}</span>
            </div>

            <div className={styles.quantityControls}>
              <button
                onClick={() => decreaseQuantity(item.product.id)}
                className={styles.quantityButton}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    item.product.id,
                    parseInt(e.target.value)
                  )
                }
                className={styles.quantityInput}
              />
              <button
                onClick={() => increaseQuantity(item.product.id)}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromSalee(item.product.id)}
              className={styles.removeButton}
            >
              Remover
            </button>
          </div>
        ))}
        <div className={styles.divDiscount}>
          <h4>subtotal: R$ </h4>
          <input
            type="number"
            className={styles.discount}
            placeholder="desconto"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <h3>Total: R$ </h3>
        </div>
        <button className={styles.submitButton}>salvar</button>
      </ul>
    </div>
  );
};

export default SaleDetails;
