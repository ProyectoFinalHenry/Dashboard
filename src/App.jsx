import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavBar/NavigationBar.jsx'
import './App.css'

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        {/**<Route path="/" element={<LandinPage />} />**/}
      </Routes>
    </div>
  )
}

export default App
