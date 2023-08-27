import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavBar/NavigationBar.jsx'
import ProductsList from './views/Products/List/ProductsList.jsx';
import ProductsCreate from './views/Products/Create/ProductsCreate.jsx';
import './App.css'

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/create" element={<ProductsCreate />} />
      </Routes>
    </div>
  )
}

export default App
