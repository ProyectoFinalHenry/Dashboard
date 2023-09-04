import { Route, Routes } from 'react-router-dom';
import ProductsList from './views/Products/List/ProductsList.jsx';
import ProductsCreate from './views/Products/Create/ProductsCreate.jsx';
import ProductsDetail from './views/Products/Detail/ProductsDetail.jsx';
import ProductsUpdate from './views/Products/Update/ProductsUpdate.jsx';
import Dashboard from './views/Dashboard/Dashboard.jsx';
import AdminLogin from './views/AdminLogin/AdminLogin.jsx'
import Users from './views/Users/Users.jsx';
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLogin />} />

        <Route path="/users" element={<Users />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/create" element={<ProductsCreate />} />
        <Route path="/products/detail/:id" element={<ProductsDetail />} />
        <Route path="/products/update/:id" element={<ProductsUpdate />} />
      </Routes>
    </div>
  )
}

export default App
