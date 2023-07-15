import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'

import { Context } from './Context';

import { getBuyers, getProducts, getPurchases } from './services/ApiService';

import Sidebar from './components/Sidebar/Sidebar';
import BuyersPage from './pages/BuyersPage';
import ProductsPage from './pages/ProductsPage';
import PurchasesPage from './pages/PurchasesPage';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';

import './App.css';


function App() {
  const [buyers, setBuyers] = useState([])
  const [products, setProducts] = useState([])
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    Promise.allSettled([getBuyers(), getProducts(), getPurchases()]).then((results) => {
      const [buyersResult, productsResult, purchasesResult] = results
      if (buyersResult.status === 'fulfilled') {
        setBuyers(buyersResult.value)
      }
      if (productsResult.status === 'fulfilled') {
        setProducts(productsResult.value)
      }
      if (purchasesResult.status === 'fulfilled') {
        setPurchases(purchasesResult.value)
      }
    })
  }, [])

  return (
    <Context.Provider value={{ buyers, setBuyers, products, setProducts, purchases, setPurchases }}>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
