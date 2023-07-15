import { apiServer } from './Config';

function convertToCamelCase(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => convertToCamelCase(item))
    }

    const result = {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
            result[camelCaseKey] = convertToCamelCase(obj[key])
        }
    }

    return result
}


function convertToSnakeCase(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => convertToSnakeCase(item))
    }

    const result = {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const snakeCaseKey = key.replace(/([A-Z])/g, (match) => '_' + match.toLowerCase())
            result[snakeCaseKey] = convertToSnakeCase(obj[key])
        }
    }

    return result
}

// Методы для работы с покупателями
export const getBuyers = async () => {
    return await apiServer.get('/buyers/').then((r) => convertToCamelCase(r.data?.results)).catch((e) => { console.log(e) })
}

export const createBuyer = async (buyerData) => {
    return await apiServer.post('/buyers/', convertToSnakeCase(buyerData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const getBuyer = async (id) => {
    return await apiServer.get(`/buyers/${id}/`).then((r) => convertToCamelCase(r.data?.results)).catch((e) => { console.log(e) })
}

export const updateBuyer = async (id, buyerData) => {
    return await apiServer.put(`/buyers/${id}/`, convertToSnakeCase(buyerData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const partialUpdateBuyer = async (id, buyerData) => {
    return await apiServer.patch(`/buyers/${id}/`, convertToSnakeCase(buyerData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const deleteBuyer = async (id) => {
    return await apiServer.delete(`/buyers/${id}/`).catch((e) => { console.log(e) })
}


// Методы для работы с товарами
export const getProducts = async () => {
    return await apiServer.get('/products/').then((r) => convertToCamelCase(r.data?.results)).catch((e) => { console.log(e) })
}

export const createProduct = async (productData) => {
    return await apiServer.post('/products/', convertToSnakeCase(productData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const getProduct = async (id) => {
    return await apiServer.get(`/products/${id}/`).then((r) => convertToCamelCase(r.data?.results)).catch((e) => { console.log(e) })
}

export const updateProduct = async (id, productData) => {
    return await apiServer.put(`/products/${id}/`, convertToSnakeCase(productData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const partialUpdateProduct = async (id, productData) => {
    return await apiServer.patch(`/products/${id}/`, convertToSnakeCase(productData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const deleteProduct = async (id) => {
    return await apiServer.delete(`/products/${id}/`).catch((e) => { console.log(e) })
}



// Методы для работы с покупками
export const getPurchases = async () => {
    return await apiServer.get('/purchases/').then((r) => convertToCamelCase(r.data?.results)).catch((e) => { console.log(e) })
}

export const createPurchase = async (purchaseData) => {
    return await apiServer.post('/purchases/', convertToSnakeCase(purchaseData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const getPurchase = async (id) => {
    return await apiServer.get(`/purchases/${id}/`).then((r) => convertToCamelCase(r.data?.results)).catch((e) => { console.log(e) })
}

export const updatePurchase = async (id, purchaseData) => {
    return await apiServer.put(`/purchases/${id}/`, convertToSnakeCase(purchaseData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const partialUpdatePurchase = async (id, purchaseData) => {
    return await apiServer.patch(`/purchases/${id}/`, convertToSnakeCase(purchaseData)).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}

export const deletePurchase = async (id) => {
    return await apiServer.delete(`/purchases/${id}/`).catch((e) => { console.log(e) })
}

export const getPurchaseReport = async (date) => {
    return await apiServer.get(`/purchases/report/?date=${date ? date : '1970-01-01'}`).then((r) => convertToCamelCase(r.data)).catch((e) => { console.log(e) })
}