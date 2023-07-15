import React, { useState } from 'react';

import PurchasesList from '../components/Purchases/PurchasesList';
import PurchaseForm from '../components/Purchases/PurchaseForm';

import Button from '../ui/Button/Button';
import Modal from '../ui/Modal/Modal';

const PurchasesPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)

  const handleOpen = () => {
    setSelectedPurchase(null)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <h1>Реестр покупок</h1>
      <p>
        На этой странице вы можете управлять реестром покупок.
        Вы можете только создавать и просматривать. <b>В целях безопасности обновление и удаление совершенной покупки невозможно!</b>
      </p>
      <Button cls="primary" onClick={handleOpen}>Новая покупка</Button>
      <PurchasesList />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <PurchaseForm onClose={handleClose} selectedPurchase={selectedPurchase} />
      </Modal>
    </div>
  )
}

export default PurchasesPage