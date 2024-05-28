import Axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/users`

export function loginUser(username, password) {
    return Axios.post(baseUrl + "/acessar", {username, password})
}

export function registerUser(username, password){
    return Axios.post(baseUrl + "/cadastrar", {username, password})
}

export function getUserOrders(userId){
    return Axios.get(baseUrl + `/pedidos/${userId}`)
}