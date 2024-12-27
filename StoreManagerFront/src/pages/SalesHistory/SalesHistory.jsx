import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import SalesHistoryComponent from "../../components/SalesHistory/SalesHistory";

const SalesHistory = () => {
  return (
    <div>
      <Header />

      <SalesHistoryComponent />
    </div>
  );
};

export default SalesHistory;
