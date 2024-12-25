import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddProduct from "./pages/AddProduct/AddProduct";
import ManageSales from "./pages/ManageSales/ManageSales";
import SalesHistory from "./pages/SalesHistory/SalesHistory";
import LowStock from "./pages/LowStock/LowStock";
const App = () => {
  return (
    <Router>
      <div className={"app"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-sales" element={<ManageSales />} />
          <Route path="/sales-history" element={<SalesHistory />} />
          <Route path="/low-stock" element={<LowStock />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
