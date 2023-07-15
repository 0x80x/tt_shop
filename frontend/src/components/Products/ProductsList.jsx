import React, { useContext } from 'react';
import { Context } from '../../Context';

import Table from '../../ui/Table/Table';

const ProductsList = ({ onRowClick }) => {
  const { products } = useContext(Context)

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Наименование товара', field: 'name' },
    { title: 'Стоимость закупки', field: 'purchasePrice' },
    { title: 'Стоимость продажи', field: 'salePrice' },
  ]

  return <Table title="Список товаров" columns={columns} data={products} onRowClick={onRowClick} />
}

export default ProductsList