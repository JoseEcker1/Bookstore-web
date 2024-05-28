import Axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/products`

export function getProductById(pId) {
    return Axios.get(baseUrl + `/${pId}`)
}

export function findAllProducts(){
    return Axios.get(baseUrl)
}