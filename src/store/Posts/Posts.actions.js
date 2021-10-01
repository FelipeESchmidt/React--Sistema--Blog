export function getProducts() {
    return {
        type: 'GET',
        payload: ''
    }
}

export function toggleProduct(filter) {
    return {
        type: 'FILTER',
        payload: filter
    }
}