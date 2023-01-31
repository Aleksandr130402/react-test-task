import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../services/api'

import './HomePage.css'

const HomePage = () => {
  const [clothes, setClothes] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProducts()
      setClothes(response)
    }
    fetchProduct()
  }, [])

  return (
    <div className="clothes">
      {clothes?.map(({ name, id, colors }) => (
        <div className="clothes-item pointer" key={id}>
          <Link to={`/${id}`}>
            <img
              className="clothes-item-img"
              src={colors[0]?.images[0]}
              alt="item main view"
            />
            <h3 className="clothes-item-name">{name}</h3>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default HomePage
