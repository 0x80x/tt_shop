import React from 'react';

import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    const handleModalClick = (event) => {
        event.stopPropagation()
    }

    return (
        isOpen && (
            <div className="modal" onClick={onClose}>
                <div className="modal-content" onClick={handleModalClick}>
                    {children}
                </div>
            </div>
        )
    )
}

export default Modal