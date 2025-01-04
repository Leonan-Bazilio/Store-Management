import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SalesForm.module.css";
import InputField from "../InputField/InputField";

const SalesForm = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleProductSelect = (product) => {
    const existing = cart.find((item) => item.product.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id, value) => {
    if (value >= 1) {
      setCart(
        cart.map((item) =>
          item.product.id === id ? { ...item, quantity: value } : item
        )
      );
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.product.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.product.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let aaaa = cart.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
    console.log(aaaa);
    try {
      await axios.post(`${baseUrl}/api/sales`, aaaa);
      alert("Venda registrada com sucesso!");
      setCart([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.salesForm}>
      <div className={styles.customSelect}>
        <div className={styles.selectHeader}>Selecione os produtos</div>
        <InputField
          nameAndId={"searchTerm"}
          type="text"
          textLabel="Pesquisar produto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.selectOptions}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={styles.selectOption}
              onClick={() => handleProductSelect(product)}
            >
              <img
                src={`${baseUrl}/uploads/${product.imagePath}`}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <span>{product.name}</span>
                <p>{product.description}</p>
                <span>Preço: R$ {product.sellingPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.cart}>
        <div className={styles.selectHeader}>Carrinho de compras</div>
        {cart.map((item) => (
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
              onClick={() => removeFromCart(item.product.id)}
              className={styles.removeButton}
            >
              Remover
            </button>
          </div>
        ))}
        <div className={styles.divDiscount}>
          <h4>subtotal: R$ 999,99 </h4>
          <input
            type="number"
            className={styles.discount}
            placeholder="desconto"
          />
          <h3>Total: R$ 999,99</h3>
        </div>
        <div className={styles.divSubmitButton}>
          <button onClick={handleSubmit} className={styles.submitButton}>
            Finalizar Venda
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
//na direita 'cart' estou usando o input envez do InputField para ver uma estilização mais quadrada e ver see fica legal
