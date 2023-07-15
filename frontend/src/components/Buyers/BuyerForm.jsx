import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context';

import Button from '../../ui/Button/Button';
import { createBuyer, partialUpdateBuyer, deleteBuyer } from '../../services/ApiService';

import './Buyer.css';

const BuyerForm = (props) => {
    const { setBuyers } = useContext(Context)

    const [buyer, setBuyer] = useState({
        fullName: '',
        birthYear: '',
        gender: '',
        consentToProcessing: false,
    })

    const genders = ['M', 'F']

    useEffect(() => {
        props.selectedBuyer && setBuyer(props.selectedBuyer)
    }, [props.selectedBuyer])

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target
        const inputValue = type === 'checkbox' ? checked : value
        setBuyer((prevBuyer) => ({
            ...prevBuyer,
            [name]: inputValue,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!buyer.fullName || !buyer.birthYear || !buyer.gender) {
            return
        }
        if (props.selectedBuyer) {
            const updatedBuyer = await partialUpdateBuyer(props.selectedBuyer.id, buyer)
            setBuyers((prevBuyers) =>
                prevBuyers.map((prevBuyer) => (prevBuyer.id === updatedBuyer.id ? updatedBuyer : prevBuyer))
            )
            props.onClose()
        } else {
            const createdBuyer = await createBuyer(buyer)
            setBuyers((prevBuyers) => [...prevBuyers, createdBuyer])
            props.onClose()
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        if (window.confirm(`Вы уверены, что хотите удалить покупателя: ${props.selectedBuyer.fullName}?`)) {
            await deleteBuyer(props.selectedBuyer.id)
            setBuyers((prevBuyers) => prevBuyers.filter((prevBuyer) => prevBuyer.id !== props.selectedBuyer.id))
            props.onClose()
        }
    }


    return (
        <div className="BuyerForm">
            <h2>{props.selectedBuyer ? 'Редактировать покупателя' : 'Создать покупателя'}</h2>
            <form>
                <label>
                    ФИО:
                    <input
                        type="text"
                        name="fullName"
                        value={buyer.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Год рождения:
                    <input
                        type="text"
                        name="birthYear"
                        value={buyer.birthYear}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <select name="gender" value={buyer.gender} onChange={handleInputChange} required>
                    <option value="">Выберите пол</option>
                    {genders.map((gender) => (
                        <option key={gender} value={gender}>
                            {gender}
                        </option>
                    ))}
                </select>
                <label>
                    Согласие на обработку ПД:
                    <input
                        type="checkbox"
                        name="consentToProcessing"
                        checked={buyer.consentToProcessing}
                        onChange={handleInputChange}
                    />
                </label>
                {props.selectedBuyer && (
                    <Button cls="danger" onClick={handleDelete}>
                        Удалить
                    </Button>
                )}
                <Button cls="success" type="submit" onClick={handleSubmit}>
                    {props.selectedBuyer ? 'Сохранить' : 'Создать'}
                </Button>
            </form>
        </div>
    )
}

export default BuyerForm