import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/add-product" className={styles.link}>
          Cadastrar Produto
        </Link>
        <Link to="/manage-sales" className={styles.link}>
          Efetuar Venda
        </Link>
        <Link to="/sales-history" className={styles.link}>
          Histórico de Vendas
        </Link>
        <Link to="/low-stock" className={styles.link}>
          Baixo Estoque
        </Link>
      </nav>
    </header>
  );
};

export default Header;
