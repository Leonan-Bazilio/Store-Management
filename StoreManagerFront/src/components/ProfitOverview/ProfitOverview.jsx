import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProfitOverview.module.css";

const ProfitOverview = () => {
  const [salesData, setSalesData] = useState([]);
  const [expandedSales, setExpandedSales] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/sales`);
        setSalesData(response.data);
        setError("");
      } catch (err) {
        setError("Erro ao buscar dados de vendas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [baseUrl]);

  const calculateProfit = (sale) =>
    sale.items.reduce(
      (acc, item) =>
        acc +
        item.quantity * (item.product.sellingPrice - item.product.costPrice),
      0
    );

  const filteredSales = salesData.filter((sale) => {
    const saleDate = new Date(sale.saleDate);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();

    const matchesDateRange =
      (!startDate || saleDate >= start) && (!endDate || saleDate <= end);

    const matchesSearchQuery = sale.items.some((item) =>
      item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return matchesDateRange && matchesSearchQuery;
  });

  const toggleSaleExpand = (saleId) => {
    setExpandedSales((prevState) => ({
      ...prevState,
      [saleId]: !prevState[saleId],
    }));
  };

  const totalProfit = filteredSales.reduce(
    (acc, sale) => acc + calculateProfit(sale),
    0
  );

  if (loading) return <div className={styles.loading}>Carregando dados...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestão de Lucros</h1>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Pesquisar Produto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.dateFields}>
          <div className={styles.dateField}>
            <label htmlFor="startDate">Data Inicial:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
          <div className={styles.dateField}>
            <label htmlFor="endDate">Data Final:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        <p>
          Lucro Total Filtrado: <strong>R$ {totalProfit.toFixed(2)}</strong>
        </p>
      </div>
      <ul className={styles.salesList}>
        {filteredSales.map((sale) => (
          <li key={sale.id} className={styles.saleItem}>
            <div className={styles.saleHeader}>
              <span className={styles.saleDate}>
                {new Date(sale.saleDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className={styles.saleTime}>
                {new Date(sale.saleDate).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <button
                className={styles.expandButton}
                onClick={() => toggleSaleExpand(sale.id)}
              >
                {expandedSales[sale.id] ? "▲ Fechar" : "▼ Detalhes"}
              </button>
            </div>
            {expandedSales[sale.id] && (
              <div className={styles.saleDetails}>
                <div className={styles.saleItems}>
                  {sale.items.map((item, index) => (
                    <div key={index} className={styles.saleItemDetail}>
                      <span className={styles.itemName}>
                        {item.product.name} (Qtd: {item.quantity})
                      </span>
                      <span className={styles.itemCost}>
                        Custo: R$ {item.product.costPrice.toFixed(2)}
                      </span>
                      <span className={styles.itemSelling}>
                        Venda: R$ {item.product.sellingPrice.toFixed(2)}
                      </span>
                      <span className={styles.itemProfit}>
                        Lucro: R${" "}
                        {(
                          item.quantity *
                          (item.product.sellingPrice - item.product.costPrice)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className={styles.subtotal}>
                  Subtotal da Venda: R$ {calculateProfit(sale).toFixed(2)}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfitOverview;
