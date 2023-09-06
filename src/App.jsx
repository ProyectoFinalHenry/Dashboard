import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(localStorage.getItem("auth_token") !== null);
  const location = useLocation();

  useEffect(() => {
    setUsuarioAutenticado(localStorage.getItem("auth_token") !== null);
  }, [location]);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/panel" element={usuarioAutenticado ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/users" element={usuarioAutenticado ? <Users /> : <Navigate to="/" /> } />
        <Route path="/sales" element={usuarioAutenticado ? <SalesList /> : <Navigate to="/" />} />
        <Route path="/products" element={usuarioAutenticado ? <ProductsList /> : <Navigate to="/" />} />
        <Route path="/products/create" element={usuarioAutenticado ? <ProductsCreate /> : <Navigate to="/" />} />
        <Route path="/products/detail/:id" element={usuarioAutenticado ? <ProductsDetail /> : <Navigate to="/" />} />
        <Route path="/products/update/:id" element={usuarioAutenticado ? <ProductsUpdate /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
