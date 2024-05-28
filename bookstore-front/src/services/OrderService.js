import Axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/orders`

export function confirmOrder(userId, cart) {
    return Axios.post(baseUrl, {clientId: userId, items: cart })
}