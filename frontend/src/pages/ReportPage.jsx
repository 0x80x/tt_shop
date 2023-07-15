import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../Context';

import { getPurchaseReport } from '../services/ApiService';

import Table from '../ui/Table/Table';

import './Pages.css';


const ReportPage = () => {
    const { buyers } = useContext(Context)

    const [purchaseReport, setPurchaseReport] = useState([])
    const [selectedDate, setSelectedDate] = useState('')

    const columns = [
        { title: 'Покупатель', field: 'buyer' },
        { title: 'Суммарная стоимость', field: 'totalPrice' }
    ]

    useEffect(() => {
        selectedDate && getPurchaseReport(selectedDate).then((report) => (setPurchaseReport(report)))
    }, [selectedDate])

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
    }

    const processedData = purchaseReport.map((purchase) => {
        const { buyer } = purchase
        const buyerName = buyers.find((b) => b.id === buyer)?.fullName

        return {
            ...purchase,
            'buyer': buyerName,
        }
    })

    return (
        <div className='ReportPage'>
            <h1>Страница отчета</h1>
            <p>
                На этой странице вы можете получить отчет о покупках. Вы можете указать дату совершения покупок и получить
                отчет с суммарной стоимостью покупок, отсортированный по убыванию.
            </p>
            <label htmlFor="dateInput">Введите дату: </label>
            <input
                type="date"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
            />
            {selectedDate && (<Table columns={columns} data={processedData} />)}
        </div>
    )
}

export default ReportPage