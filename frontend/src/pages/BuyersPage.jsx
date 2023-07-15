import React, { useState } from 'react';

import BuyersList from '../components/Buyers/BuyersList';
import BuyerForm from '../components/Buyers/BuyerForm';

import Button from '../ui/Button/Button';
import Modal from '../ui/Modal/Modal';

const BuyersPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedBuyer, setSelectedBuyer] = useState(null)

    const handleOpen = () => {
        setSelectedBuyer(null)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleRowClick = (row) => {
        setSelectedBuyer(row)
        setIsOpen(true)
    }

    return (
        <div>
            <h1>Справочник покупателей</h1>
            <p>
                На этой странице вы можете управлять справочником покупателей. Вы можете создавать, просматривать, обновлять
                и удалять информацию о покупателях.
            </p>
            <Button cls="success" onClick={handleOpen}>Добавить</Button>
            <BuyersList onRowClick={handleRowClick} />
            <Modal isOpen={isOpen} onClose={handleClose}>
                <BuyerForm onClose={handleClose} selectedBuyer={selectedBuyer} />
            </Modal>
        </div>
    )
}

export default BuyersPage