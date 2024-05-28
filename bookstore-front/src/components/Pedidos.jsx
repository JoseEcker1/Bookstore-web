import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../services/UserService.js'
import Loading from './Loading.jsx'
import Collapse from 'react-bootstrap/Collapse';
import './Pedidos.css'

export default function Pedidos( {user} ){

    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [collapse, setCollapse] = useState([])
    const [loading, setLoading] = useState("A")

    useEffect(() => {
        setLoading(<Loading container={"pedidos-loading"} classeSpin={"pedidos-spin"}/>)

        getUserOrders(user.id).then(resp => {
            setLoading(null)
            setOrders(resp.data)
            let newCollapse = Array.from({length: resp.data.length}, () => (false))
            setCollapse([...newCollapse])
        }).catch(error => {
            navigate("/acesso")
        })
    }, [user.id, navigate])


    function viewDetails(ind){
        let copyCollapse = collapse
        copyCollapse[ind] = copyCollapse[ind] ? false : true
        setCollapse([...copyCollapse])
    }

    return(
        <div className='pedidos'>
            <div className='meus-pedidos'>
                <i className="bi bi-bag"></i>
                <span className='fw-bold'>MEUS PEDIDOS</span>
            </div>
            {loading}
            {orders.map( (o, ind) => {
                return(
                    <div key={ind} className="container-pedido">
                        <div className="pedido-info">
                            <div className="info-container">
                                <span className='fw-bold'>Código do pedido:</span>
                                <span>{o.id.slice(0,15)}</span>
                            </div>
                            <div className="info-container">
                                <span className='fw-bold'>Status</span>
                                <span style={{color: "orange", fontWeight: "bold"}}>Aguardando pagamento</span>
                            </div>
                            <div className="info-container">
                                <span className='fw-bold'>Data</span>
                                <span>01/01/2030</span>
                            </div>
                            <div className="info-container">
                                <span className='p-detalhes' onClick={e => viewDetails(ind)}>
                                    Ver Detalhes
                                    <i className={`bi bi-chevron-${collapse[ind] ? "up" : "down"}`}></i>
                                </span>
                            </div>
                        </div>
                        <Collapse in={collapse[ind]}>
                            <div className="container-collapse">
                                <table className='pedidos-table'>
                                    <thead>
                                        <tr>
                                            <th className='col-8'>PRODUTOS</th>
                                            <th className='col-4 th-total'>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {o.items.map( (op, i) => {
                                            return(
                                                <tr key={i}>
                                                    <td>
                                                        <div className='pedidos-container-td'>
                                                            <img className='pedidos-img' src={`${op.product.imageUrl}`} alt="" />
                                                            <div className="ped-detalhes-produto">
                                                                <span className='ped-dp-titulo'>{op.product.productName}</span>
                                                                <span className='ped-dp-qnt'>Quantidade: {op.quantity}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'><span className='ped-valor-item'>R$ {op.totalValue.toFixed(2)}</span></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="ped-total-container">
                                    <div className="ped-t-row">
                                        <span>TOTAL PRODUTO(S)</span>
                                        <span>R$ {(o.items.reduce( (accum, curr) => accum + Number(curr.totalValue), 0)).toFixed(2)}</span>
                                    </div>
                                    <div className="ped-t-row">
                                        <span>FRETE</span>
                                        <span>R$ 0,00</span>
                                    </div>
                                    <div className="ped-t-row2">
                                        <span>TOTAL DO PEDIDO</span>
                                        <span>R$ {(o.items.reduce( (accum, curr) => accum + Number(curr.totalValue), 0)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>                    
                )
            })}
        </div>
    )
}