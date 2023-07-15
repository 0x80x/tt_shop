import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context';

import Button from '../../ui/Button/Button';
import { createProduct, partialUpdateProduct, deleteProduct } from '../../services/ApiService';

import './Product.css';


const ProductForm = (props) => {
    const { setProducts } = useContext(Context)

    const [product, setProduct] = useState({
        name: '',
        purchasePrice: '',
        salePrice: '',
    })

    useEffect(() => {
        props.selectedProduct && setProduct(props.selectedProduct)
    }, [props.selectedProduct])


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        if (!product.name || !product.purchasePrice || !product.salePrice) {
            return
        }
        event.preventDefault()
        if (props.selectedProduct) {
            const updatedProduct = await partialUpdateProduct(props.selectedProduct.id, product)
            setProducts((prevProducts) => prevProducts.map((prevProduct) => (prevProduct.id === updatedProduct.id ? updatedProduct : prevProduct)))
            props.onClose()
        } else {
            const createdProduct = await createProduct(product)
            setProducts((prevProduct) => [...prevProduct, createdProduct])
            props.onClose()
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        if (window.confirm(`Вы уверены, что хотите удалить товар: ${props.selectedProduct.name}?`)) {
            await deleteProduct(props.selectedProduct.id)
            setProducts((prevProducts) => prevProducts.filter((prevProduct) => prevProduct.id !== props.selectedProduct.id))
            props.onClose()
        }
    }

    return (
        <div className="ProductForm">
            <h2>{props.selectedProduct ? 'Редактировать товар' : 'Создать товар'}</h2>
            <form>
                <label>
                    Наименование товара:
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Стоимость закупки:
                    <input
                        type="text"
                        name="purchasePrice"
                        value={product.purchasePrice}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Стоимость продажи:
                    <input
                        type="text"
                        name="salePrice"
                        value={product.salePrice}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                {props.selectedProduct && (
                    <Button cls="danger" onClick={handleDelete}>
                        Удалить
                    </Button>
                )}
                <Button cls="success" type="submit" onClick={handleSubmit}>
                    {props.selectedProduct ? 'Сохранить' : 'Создать'}
                </Button>
            </form>
        </div>
    )
}

export default ProductForm