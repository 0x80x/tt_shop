import React, { useContext } from 'react';
import { Context } from '../../Context';

import Table from '../../ui/Table/Table';

const PurchasesList = () => {
    const { purchases, buyers, products } = useContext(Context)

    const columns = [
        { title: 'ID', field: 'id' },
        { title: 'ФИО покупателя', field: 'buyer.name' },
        { title: 'Дата покупки', field: 'purchaseDate' },
        { title: 'Наименование товара', field: 'items' },
        { title: 'Кол-во', field: 'quantities' },
        { title: 'Стоимость единицы', field: 'unitPrices' },
        { title: 'Суммарная стоимость', field: 'totalPrices' },
    ]

    const processedData = purchases.map((purchase) => {
        const { buyer, items, ...rest } = purchase
        const buyerName = buyers.find((b) => b.id === buyer)?.fullName
        const itemNames = items.map((item) => products.find((p) => p.id === item.product)?.name).join(', ')
        const quantities = items.map((item) => item.quantity).join(', ')
        const unitPrices = items.map((item) => item.unitPrice).join(', ')
        const totalPrices = purchase.totalPrice

        return {
            ...rest,
            'buyer.name': buyerName,
            'items': itemNames ? itemNames : '-',
            'quantities': quantities ? quantities : '-',
            'unitPrices': unitPrices ? unitPrices : '-',
            'totalPrices': totalPrices ? totalPrices : '-',
        }
    })

    return <Table title="Список покупок" columns={columns} data={processedData} />
}

export default PurchasesList