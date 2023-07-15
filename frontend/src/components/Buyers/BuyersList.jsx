import React, { useContext } from 'react';
import { Context } from '../../Context';

import Table from '../../ui/Table/Table';

const BuyersList = ({ onRowClick }) => {
    const { buyers } = useContext(Context)

    const columns = [
        { title: 'ID', field: 'id' },
        { title: 'ФИО', field: 'fullName' },
        { title: 'Год рождения', field: 'birthYear' },
        { title: 'Пол', field: 'gender' },
        { title: 'Дата регистрации', field: 'registrationDate' },
        { title: 'ПД', field: 'consentToProcessing' },
    ]

    return <Table title="Список покупателей" columns={columns} data={buyers} onRowClick={onRowClick} />
}

export default BuyersList