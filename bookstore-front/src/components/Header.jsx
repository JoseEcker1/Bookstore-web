import { useNavigate } from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './Header.css'

export default function Header( {user, setUser, cart} ){

    const navigate = useNavigate()

    function logoutUser(){
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
        setUser({})
        navigate("/")
    }

    return(
        <header className="header">
            <div className="header-logo">
                <img src="/imgs/logo/livraria-logo-zip-file/svg/logo-no-background.svg" alt="" onClick={() => navigate("/")}/>
            </div>
            <div className="header-links">
                <span className='h-link' onClick={() => navigate("/")}>Home</span>
                <span className='h-link' onClick={() => navigate("/produtos")}>Produtos</span>
                {user ? 
                    <div className='h-link-2'>
                        <DropdownButton id="dropdown-basic-button" variant="dark" title={user.charAt(0).toUpperCase() + " "}>
                            <Dropdown.Item className='hl2-dropitem' onClick={() => navigate("/pedidos")}>Pedidos</Dropdown.Item>
                            <Dropdown.Item className='hl2-dropitem' onClick={() => navigate("/carrinho")}>Carrinho {`(${cart.length})`}</Dropdown.Item>
                            <Dropdown.Item className='hl2-dropitem' onClick={() => logoutUser()}>Sair</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    :
                    <div className="h-link-2">
                        <i className="bi bi-person h-link" onClick={() => navigate("/acesso")}></i>
                    </div>
                }
            </div>
            <div className="header-links-m">
                <div className='h-link-2'>
                    <DropdownButton id="dropdown-basic-button" title={<i className="bi bi-list"></i>}>
                        <Dropdown.Item className='hl2-dropitem' onClick={() => navigate("/")}>Home</Dropdown.Item>
                        <Dropdown.Item className='hl2-dropitem' onClick={() => navigate("/produtos")}>Produtos</Dropdown.Item>
                        {user ?
                            <>
                            <Dropdown.Item className='hl2-dropitem' onClick={() => navigate("/pedidos")}>Pedidos</Dropdown.Item>
                            <Dropdown.Item className='hl2-dropitem' onClick={() => navigate("/carrinho")}>Carrinho {`(${cart.length})`}</Dropdown.Item>
                            <Dropdown.Item className='hl2-dropitem' onClick={() => logoutUser()}>Sair</Dropdown.Item>
                            </> :
                            <Dropdown.Item className='hl2-dropitem' onClick={() => navigate("/acesso")}>Logar</Dropdown.Item>
                        }
                    </DropdownButton>
                </div>
            </div>
        </header>
    )
}