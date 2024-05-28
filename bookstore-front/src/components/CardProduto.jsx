import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './CardProduto.css'


export default function CardProduto( {user, addToCart, p} ){

    const cardBottomRef = useRef(null)

    const navigate = useNavigate()

    function handleBuy(p){

        if(!user || !user.id){
            navigate("/acesso")
            return
        }
        
        cardBottomRef.current.classList.add("clicked")
        setTimeout(() => {
            if(cardBottomRef.current != null)
                cardBottomRef.current.classList.remove("clicked")
        }, 2000)
        
        addToCart(p, 1, () => {})
    }

    return(
        <div className="card-livro card">
            <div className="card-top center">
                <img src={p.imageUrl} alt="" onClick={() => navigate(`/produtos/${p.id}`)}/>
            </div>
            <div className="card-mid center">
                <span className='cl-titulo' onClick={() => navigate(`/produtos/${p.id}`)}>{p.productName}</span>
            </div>
            <div className="card-bot" ref={cardBottomRef}>
                <div className="cb-left">
                    <div className="cl-preco center">
                        <span>R$ {p.price.toFixed(2).toString().replace(".", ",")}</span>
                    </div>
                    <div className="card-icon center" onClick={e => handleBuy(p)}>
                        <i className="bi bi-cart-plus"></i>
                    </div>
                </div>
                <div className="cb-right center">
                    <div className="card-add">
                        <div className='card-check center'>
                            <i className="bi bi-check-circle"></i>
                        </div>
                        <div className='cb-text'>
                            <span>Adicionado ao carrinho</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}