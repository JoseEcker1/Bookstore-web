import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { findAllProducts } from '../services/ProductService.js'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import './Home.css'

export default function Home(){

    const [homeBooks, setHomeBooks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        findAllProducts().then(resp => {
            let shuffle = resp.data.sort(() => 0.5 - Math.random());
            const booksArray = [shuffle.slice(0, 5), shuffle.slice(5, 10), shuffle.slice(10, 15), shuffle.slice(15, 20), shuffle.slice(20, 25)]
            setHomeBooks([...booksArray])
        })
    }, [])

    return(
        <div className="home">
            <div className='container-banner-carousel'>
                <Carousel data-bs-theme="dark" className='banner-carousel'>
                    <Carousel.Item>
                        <img
                        className='banner-img'
                        src="/imgs/home/home1_1360.png"
                        alt="banner1"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="banner-img"
                        src="/imgs/home/home2_1360.png"
                        alt="banner2"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="banner-img"
                        src="/imgs/home/home3.png"
                        alt="banner3"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <span className='mt-5 livro-em-destaque'>Livros em destaque</span>
            <div className="container-destaque-carousel center">
                <Carousel data-bs-theme="dark" className='destaque-carousel center' interval={null}>
                    {homeBooks.map((hb, i1) => {
                        return(
                            <Carousel.Item key={i1}>
                                <div className="container-destaque-item">
                                    {hb.map((b, i2) => {
                                        return(
                                            <div key={i2} className="container-destaque-img" onClick={() => navigate(`/produtos/${b.id}`)}>
                                                <img
                                                    className="destaque-img"
                                                    src={b.imageUrl}
                                                    alt="imagem"
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
            <Button variant='outline-secondary' className='home-btn' onClick={e => navigate("/produtos")}>Acessar catálogo completo</Button>
        </div>
    )
}