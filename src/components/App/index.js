import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ClothesItemPage from '../../pages/ClothesItemPage'
import HomePage from '../../pages/HomePage'

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ClothesItemPage />} />
      </Routes>
    </div>
  )
}
