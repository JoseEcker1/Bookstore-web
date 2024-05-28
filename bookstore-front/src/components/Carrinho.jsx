import { useNavigate } from 'react-router-dom'
import { confirmOrder } from '../services/OrderService.js'
import Button from 'react-bootstrap/Button';
import './Carrinho.css'

export default function Carrinho( {cart, setCart, userId} ){

    const navigate = useNavigate()

    function removeFromCart(p){
        let newCart = cart.filter(i => i.product.id !== p.id)
        localStorage.setItem(`carrinho${userId}`, JSON.stringify(newCart))
        setCart(newCart)
    }
    
    function handlePurchase(e){
        e.preventDefault()

        confirmOrder(userId, cart).then(resp => {
            localStorage.removeItem(`carrinho${userId}`)
            setCart([])
            navigate("/pedidos")
        })
    }

    function handleChange(item, ind, v){

        if(v === 0){
            removeFromCart(item.product)
            return
        }

        if((/^[0-9]+$/.test(v) || v === "") && v !== "0"){
            let copyCart = cart
            copyCart[ind] = {
                ...item,
                quantity: v,
                totalValue: (Number(item.unitValue) * Number(v)).toFixed(2)
            }
    
            localStorage.setItem(`carrinho${userId}`, JSON.stringify(copyCart))
            setCart([...copyCart])
        }
    }

    function handleBlur(item, ind){
        if(cart[ind].quantity === ""){
            handleChange(item, ind, 1)
        }
    }

    return(
        <div className='carrinho'>
            <table className='carrinho-table'>
                <thead>
                    <tr>
                        <th className="col-6">Item</th>
                        <th className="col-3 carrinho-th2">Quantidade</th>
                        <th className="col-3"><div className='th-subtotal'>Subtotal</div></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, ind) => {
                        return(
                            <tr key={item.product.id}>
                                <td>
                                    <div className="carrinho-item carrinhom-item">
                                        <i className="bi bi-x-square-fill x-m" onClick={e => removeFromCart(item.product)}></i>
                                        <img className='ci-img cim-img' src={item.product.imageUrl} alt="" />
                                        <span className='ci-titulo'>
                                            {item.product.productName}
                                        </span>
                                        <div className="carrinho-qnt center carrinhom-qnt">
                                            <i className="bi bi-chevron-left" onClick={() => handleChange(item, ind, item.quantity - 1)}></i>
                                            <input type="text" value={item.quantity} 
                                            onChange={(e) => handleChange(item, ind, e.target.value)} 
                                            onBlur={() => handleBlur(item, ind)}
                                            />
                                            <i className="bi bi-chevron-right" onClick={() => handleChange(item, ind, Number(item.quantity) + 1)}></i>
                                        </div>
                                    </div>
                                </td>
                                <td className='carrinho-td2'>
                                    <div className="carrinho-qnt center">
                                        <i className="bi bi-chevron-left" onClick={() => handleChange(item, ind, item.quantity - 1)}></i>
                                        <input type="text" value={item.quantity} 
                                        onChange={(e) => handleChange(item, ind, e.target.value)} 
                                        onBlur={() => handleBlur(item, ind)}
                                        />
                                        <i className="bi bi-chevron-right" onClick={() => handleChange(item, ind, Number(item.quantity) + 1)}></i>
                                    </div>
                                </td>
                                <td>
                                    <div className='carrinho-subtotal'>R$ {item.totalValue}</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="carrinho-end">
                <Button className='mt-1 ce-button' variant="outline-primary btn-lg" onClick={() => navigate("/produtos")}>Continuar comprando</Button>
                <div className='carrinho-total card'>
                    <div className="total-produtos">
                        <span>Valor dos produtos:</span> 
                        <span>{(cart.reduce( (accum, curr) => accum + Number(curr.totalValue), 0)).toFixed(2)} R$</span>
                    </div>
                    <div className='total-frete'>
                        <span>Frete:</span>
                        <span>0,00 R$</span>
                    </div>
                    <hr className='carrinho-hr'></hr>
                    <div className='valor-total'>
                        <span style={{fontWeight: "400", color: "black"}}>Total:</span>
                        <span>{(cart.reduce( (accum, curr) => accum + Number(curr.totalValue), 0)).toFixed(2)} R$</span>
                    </div>
                    <div className="carrinho-container-btn">
                        <Button variant="success btn-lg" disabled={cart[0] === undefined} onClick={e => handlePurchase(e)}>Finalizar compra</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}