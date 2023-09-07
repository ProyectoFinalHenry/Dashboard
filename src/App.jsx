import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import ProductsList from './views/Products/List/ProductsList.jsx';
import ProductsCreate from './views/Products/Create/ProductsCreate.jsx';
import ProductsDetail from './views/Products/Detail/ProductsDetail.jsx';
import ProductsUpdate from './views/Products/Update/ProductsUpdate.jsx';
import Dashboard from './views/Dashboard/Dashboard.jsx';
import AdminLogin from './views/AdminLogin/AdminLogin.jsx'
import Users from './views/Users/Users.jsx';
import SalesList from './views/Sales/SalesList.jsx';
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token && location.pathname !== "/") {
      navigate("/");
    }
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/panel" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/create" element={<ProductsCreate />} />
        <Route path="/products/detail/:id" element={<ProductsDetail />} />
        <Route path="/products/update/:id" element={<ProductsUpdate />} />
      </Routes>
    </div>
  )
}

export default App
