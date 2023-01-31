import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, getSizes } from '../../services/api'

import './ClothesItemPage.css'

const ClothesItemPage = () => {
  const [item, setItem] = useState({})
  const [sizes, setSizes] = useState([])
  const [activeImage, setActiveImage] = useState(0)
  const [activeColor, setActiveColor] = useState({})

  const { id } = useParams()

  const selectItemImgMini = (e) => {
    const target = e.target
    //если нажатие по миниатюре, выбрать ее
    if (target.classList.contains('clothes-item-img-mini')) {
      setActiveImage(parseInt(target.id))
    }
  }

  //найти нужный объект из массива colors
  const handleChange = (e) => {
    const selected = item.colors.find((color) => color.name === e.target.value)
    setActiveColor(selected)
  }

  //если цвет изменился показать первую картинку
  useEffect(() => {
    setActiveImage(0)
  }, [activeColor])

  //получить продукт по id и отобразить
  //информацию для первого цвета
  useEffect(() => {
    if (id) {
      const getItem = async () => {
        const item = await getProduct(id)
        const sizes = await getSizes()
        setItem(item)
        setSizes(sizes)
        setActiveColor(item.colors[0])
      }
      getItem()
    }
  }, [id])

  const { images, price, description, sizes: activeSizes } = activeColor

  return (
    Object.keys(item).length > 0 &&
    Object.keys(activeColor).length > 0 && (
      <>
        <Link className="goBackButton" to="/">
          <button className="pointer">Go Back</button>
        </Link>
        <div>
          <div>
            <img
              className="clothes-item-img pointer"
              src={images[activeImage]}
              alt="main"
            />
          </div>
          <select className="clothes-item-color" onChange={handleChange}>
            {item.colors.map((color, id) => (
              <option key={id}>{color.name}</option>
            ))}
          </select>
          <div>
            <div>
              <div onClick={selectItemImgMini}>
                {images.map((path, id) => (
                  <img
                    key={id}
                    id={id}
                    className={`clothes-item-img-mini pointer ${
                      id === activeImage ? 'active' : ''
                    }`}
                    src={path}
                    alt="item views"
                  />
                ))}
              </div>

              <h3>{price}</h3>
              <p>{description}</p>
              <div className="clothes-item-sizes">
                {sizes.map(({ id, label, number }, key) => (
                  <div key={key}>
                    <input
                      type="checkbox"
                      disabled={!activeSizes.includes(id)}
                    />
                    <div
                      className={activeSizes.includes(id) ? 'available' : ''}
                    >
                      <span>{label}</span> <span>{number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default ClothesItemPage
