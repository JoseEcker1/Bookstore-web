import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductById } from '../services/ProductService.js'
import Button from 'react-bootstrap/Button'
import InnerImageZoom from 'react-inner-image-zoom';
import Carousel from 'react-bootstrap/Carousel';
import './ProdutoPage.css'


export default function ProdutoPage( {addToCart, user} ){

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    
    useEffect(() => {
        getProductById(id).then(resp => setProduct(resp.data))
    }, [id])

    function changeQuantity(v){
        if((/^[0-9]+$/.test(v) || v === "") && v !== "0"){
            setQuantity(v)
        } 
    }

    function handleBlur(){
        if(quantity === ""){
            setQuantity(1)
        }
    }

    function handleBuy(){

        if(!user || !user.id){
            navigate("/acesso")
            return
        }

        addToCart(product, Number(quantity), () => navigate("/carrinho"))
    }

    return(
        <div className='produto-page'>
            <div className='pp-container1'>
                <div className="pp-container-img">
                    <div className="selecionar-img">
                        <div className="si-card card center">
                            <img  className="pp-si-img" src={product.imageUrl} alt="" />
                        </div>
                    </div>
                    <InnerImageZoom className='pp-iiz'
                        src= {product.imageUrl || ""}
                        zoomSrc= {product.imageUrl}
                        zoomType="hover"
                        zoomPreload={true}
                        zoomScale= {0.5}
                        hideHint = {true}
                        width={"280px"}
                    />
                </div>
                <div className="pp-container-imgm">
                    <Carousel data-bs-theme="dark" className='pp-carousel'>
                        <Carousel.Item>
                            <img
                            className='pp-imgm'
                            src={product.imageUrl}
                            alt="imagem"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="pp-info">
                    <div className="pp-i-titulo">
                        {product.productName}
                        <i className="bi bi-heart"></i>
                    </div>
                    <div className="pp-avaliacao">
                        <span className='pp-a-nota'>4,5</span>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                        <span className='pp-a-avalicoes'>22 avaliações</span>
                    </div> 
                    <div className="pp-quantidade">
                        <div className="pp-preco">R$ {product.price ? product.price.toFixed(2).toString().replace(".", ",") : ""}</div>
                        <div className="pp-qnt-container-input">
                            <Button variant="secondary" disabled={quantity <= 1 ? true : false} className='pp-qnt-btn btn-sm' onClick={e => setQuantity(quantity - 1)}>-</Button>
                            <input type="text" className='pp-qnt-input' onBlur={handleBlur}
                            value={quantity} onChange={e => {
                                changeQuantity(e.target.value)}}/>
                            <Button variant="secondary" className='pp-qnt-btn btn-sm' onClick={e => setQuantity(Number(quantity) + 1)}>+</Button>
                        </div>
                    </div>
                    <div className="pp-add-container">
                        <Button variant="dark" className="pp-add-btn" onClick={handleBuy}>
                            Adicionar ao carrinho
                        </Button>
                    </div>
                    <hr/>
                    <div className="container-sf">
                        <div className="fw-bold">Simular frete e prazo de entrega</div>
                        <div className="simular-frete">
                            CEP: <input type="text" className='simular-frete-input'/>
                            <Button variant="primary" className="sf-btn">Simular</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="descricao">
                <span className='descricao-sp'>Descrição: </span><br></br>
                <span className='fw-light descricao-lore-ipsum'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </span>
            </div>
        </div>
    )
}