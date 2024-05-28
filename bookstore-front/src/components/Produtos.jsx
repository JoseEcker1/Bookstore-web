import { useEffect, useState } from 'react'
import { findAllProducts } from '../services/ProductService.js'
import CardProduto from './CardProduto'
import Loading from './Loading.jsx'
import './Produtos.css'

export default function Produtos( {addToCart, user} ){

    const [productsList, setProductsList] = useState([])
    const [loading, setLoading] = useState(null)

    useEffect(() => {

        setLoading(<Loading container={"produtos-loading"} classeSpin={"produtos-spin"}/>)

        findAllProducts().then(resp => {
            setLoading(null)
            setProductsList(resp.data)
        })
    }, [])
    
    return(
        <div className='produtos'>
            {loading}
            {productsList.map( p => {
                return(
                    <CardProduto key={p.id} user={user} addToCart={addToCart} p={p}></CardProduto>
                )
            })}
        </div>
    )
}