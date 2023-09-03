import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import axios from "axios";
import './index.css'

axios.defaults.baseURL = "http://localhost:3001/";
//axios.defaults.baseURL = "https://backend-mniu.onrender.com/";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>,
)
