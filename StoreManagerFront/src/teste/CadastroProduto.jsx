import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "Produto Exemplo",
    description: "Descrição do produto",
    costPrice: 50.0,
    sellingPrice: 75.0,
    stockQuantity: 100,
    intermediateWarningQuantity: 20,
    alertQuantity: 5,
  });
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const baseUrl = "http://localhost:8080"; // Base URL para o backend

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
      fetchProducts(); // Atualiza a lista após adicionar
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <div>
      {/* Formulário para adicionar produto */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Descrição"
        />
        <input
          type="number"
          name="costPrice"
          value={product.costPrice}
          onChange={handleChange}
          placeholder="Preço de Custo"
        />
        <input
          type="number"
          name="sellingPrice"
          value={product.sellingPrice}
          onChange={handleChange}
          placeholder="Preço de Venda"
        />
        <input
          type="number"
          name="stockQuantity"
          value={product.stockQuantity}
          onChange={handleChange}
          placeholder="Quantidade em Estoque"
        />
        <input
          type="number"
          name="intermediateWarningQuantity"
          value={product.intermediateWarningQuantity}
          onChange={handleChange}
          placeholder="Quantidade de Aviso Intermediário"
        />
        <input
          type="number"
          name="alertQuantity"
          value={product.alertQuantity}
          onChange={handleChange}
          placeholder="Quantidade de Alerta"
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Enviar</button>
      </form>

      {/* Lista de produtos */}
      {fetching ? (
        <p>Carregando produtos...</p>
      ) : (
        <div>
          <h3>Lista de Produtos</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {products.map((prod) => (
              <div
                key={prod.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  maxWidth: "200px",
                  textAlign: "center",
                }}
              >
                <img
                  src={`${baseUrl}/uploads/${prod.imagePath}`}
                  alt={prod.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
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

export default ProductForm;
