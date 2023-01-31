import React from 'react'
import HomePage from '../../pages/HomePage'

import { Routes, Route } from 'react-router-dom'
import ClothesItemPage from '../../pages/HomePage/ClothesItemPage'

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
