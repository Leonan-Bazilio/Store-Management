import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>LEO</div>
      <nav className={styles.nav}>
        <div className={styles.dropdown}>
          <div className={styles.dropdownTitle}>Produto</div>
          <div className={styles.dropdownContent}>
            <Link to="/add-product" className={styles.link}>
              Cadastrar Produto
            </Link>
            <Link to="/show-product" className={styles.link}>
              Mostrar Produto
            </Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <div className={styles.dropdownTitle}>Vendas</div>
          <div className={styles.dropdownContent}>
            <Link to="/manage-sales" className={styles.link}>
              Efetuar Venda
            </Link>
            <Link to="/sales-history" className={styles.link}>
              Histórico de Vendas
            </Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <div className={styles.dropdownTitle}>Gestão</div>
          <div className={styles.dropdownContent}>
            <Link to="/low-stock" className={styles.link}>
              Baixo Estoque
            </Link>
            <Link to="/profit-overview" className={styles.link}>
              Gastos e Lucros
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
