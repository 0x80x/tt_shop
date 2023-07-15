import React, { useContext, useState } from 'react';
import { Context } from '../../Context';

import { createPurchase } from '../../services/ApiService';

import Button from '../../ui/Button/Button';

import './Purchase.css';

const PurchaseForm = (props) => {
  const { buyers, products, setPurchases } = useContext(Context)

  const item = {
    product: '',
    quantity: 1,
    unitPrice: 0.00,
  }

  const [purchase, setPurchase] = useState({
    buyer: '',
    items: []
  })

  const handleInputChange = (event, index) => {
    const { name, value } = event.target
    const newItems = [...purchase.items]

    newItems[index] = { ...newItems[index], [name]: value }
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      items: newItems,
    }))
  }

  const handleBuyerChange = (event) => {
    const { value } = event.target

    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      buyer: value,
    }))
  }

  const handleProductChange = (event, index) => {
    const { value } = event.target
    const selectedProduct = products.find((product) => String(product.id) === String(value))
    const newItems = [...purchase.items]

    newItems[index] = { ...newItems[index], product: value }

    const updatedItems = purchase.items.map((item, i) =>
      i === index ? { ...item, product: value, unitPrice: selectedProduct?.salePrice || '' } : item
    );
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      items: updatedItems,
    }));
  }

  const handleAddItem = (event) => {
    event.preventDefault()
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      items: [...prevPurchase.items, item],
    }))
  }

  const handleRemoveItem = (event, index) => {
    event.preventDefault()
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      items: prevPurchase.items.filter((item, i) => i !== index),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!purchase.buyer || purchase.items.find((p) => p.product === '')) {
      return
    }
    const createdBuyer = await createPurchase(purchase)

    setPurchases((prevBuyers) => [...prevBuyers, createdBuyer])
    props.onClose()
  }

  return (
    <div className="PurchaseForm">
      <h2>Создать покупку</h2>
      <form>
        <select name="buyer" value={purchase.buyer} onChange={handleBuyerChange}>
          <option value="">Выберите покупателя</option>
          {buyers.map((buyer) => (
            <option key={buyer.id} value={buyer.id}>
              {buyer.fullName}
            </option>
          ))}
        </select>
        {purchase.items.map((item, index) => (
          <div key={`item-${index}`}>
            <hr />
            <select name="product" value={item.product} onChange={(event) => handleProductChange(event, index)}>
              <option value="">Выберите товар</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <label>
              Количество:
              <input
                type="text"
                name="quantity"
                value={item.quantity}
                onChange={(event) => handleInputChange(event, index)}
              />
            </label>
            <label>
              Стоимость единицы:
              <input
                value={item.unitPrice}
                disabled
              />
            </label>
            <Button cls="danger" onClick={(event) => handleRemoveItem(event, index)}>
              Удалить
            </Button>
          </div>
        ))}
        <hr />

        <Button cls="success" onClick={handleAddItem}>
          Добавить товар
        </Button>

        <Button cls="success" type="submit" onClick={handleSubmit}>Создать</Button>
      </form>
    </div>
  )
}

export default PurchaseForm