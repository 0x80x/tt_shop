import React, { useState } from 'react';

import ProductsList from '../components/Products/ProductsList';
import ProductForm from '../components/Products/ProductForm';

import Button from '../ui/Button/Button';
import Modal from '../ui/Modal/Modal';

const ProductsPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleOpen = () => {
        setSelectedProduct(null)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleRowClick = (row) => {
        setSelectedProduct(row)
        setIsOpen(true)
    }

    return (
        <div>
            <h1>Справочник товаров</h1>
            <p>
                На этой странице вы можете управлять справочником товаров. Вы можете создавать, просматривать, обновлять
                и удалять информацию о товарах.
            </p>
            <Button cls="success" onClick={handleOpen}>Добавить</Button>
            <ProductsList onRowClick={handleRowClick} />
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ProductForm onClose={handleClose} selectedProduct={selectedProduct} />
            </Modal>
        </div>
    )
}

export default ProductsPage

