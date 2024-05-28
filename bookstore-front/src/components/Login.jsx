import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/UserService.js'
import Loading from './Loading.jsx'
import Button from 'react-bootstrap/Button';
import './Login.css'


export default function Login( {setUser, setCart} ){

    const [loginForm, setLoginForm] = useState(true)
    const [loginAnimation, setLoginAnimation] = useState(1)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState(null)
    const [disableButtons, setDisableButtons] = useState(false)
    const navigate = useNavigate()

    function handleRegister(e){
        e.preventDefault()
        beginValidation()

        if(!/^[A-Za-z0-9]*$/.test(username)){
            endValidation(
                <div style={{width: "55%", marginLeft: "5px"}}>
                    São permitidos apenas letras e números no nome de usuário.
                </div>
            )
            return
        }

        if(username.length === 0 || password.length === 0){
            endValidation("Todos os campos devem ser preenchidos.")
            return
        }
        
        registerUser(username, password).then(resp => {
            handleLogin(e)
        }).catch(error => {
            if(error.response.data.username){
                endValidation(error.response.data.username)
            } else if(error.response.data.password){
                endValidation(error.response.data.password)
            }
        })
    }

    function handleLogin(e){
        e.preventDefault()
        beginValidation()
        loginUser(username, password).then(resp => {
            if(resp.data){
                localStorage.setItem("username", resp.data.username)
                localStorage.setItem("userId", resp.data.id)
                setUser(resp.data)
                setCart(JSON.parse(localStorage.getItem(`carrinho${resp.data.id}`)) || [])
                navigate("/")
            } else{
                endValidation("Usuário ou senha incorretos!")
            }
        })
    }

    function beginValidation(){
        setValidation(<Loading container={"login-loading"} classeSpin={"login-spin"}/>)
        setDisableButtons(true)
    }

    function endValidation(message){
        setTimeout(() => {
            setValidation(
                <div className="lr-validation center">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    {message}
                </div>
            )
            setDisableButtons(false)
        }, 600)
    }

    function handleClick(){
        setLoginAnimation(false)
        setValidation(null)
        setTimeout(() => {
            setLoginAnimation(true)
        }, 1000)

        setLoginForm(!loginForm)
    }

    return(
        <div className='login-container'>
            {validation}
            <div className="login-form">
                {loginAnimation ? 
                <div className={`${loginAnimation === 1 ? "" : "w3-animate-right"} lf-inner`}> 
                    <div className="login-header center">
                        <div>{loginForm ? "ACESSAR" : "CRIAR CONTA"}</div>
                    </div>
                    <div className="login-inputs">
                        <div className="inputBox"> 
                            <input type="text" value={username} required
                            onChange={e => e.target.value.length <= 10 ? setUsername(e.target.value) : null}/> <i>Nome de Usuário</i>
                        </div> 
                        <div className="inputBox"> 
                            <input type="password" value={password} required
                            onChange={e => e.target.value.length <= 20 ? setPassword(e.target.value) : null}/> <i>Senha</i> 
                        </div> 
                    </div>
                    <div className="login-button">
                        {loginForm ? 
                            <Button className='lb1' variant='primary' disabled={disableButtons} onClick={e => handleLogin(e)}>Entrar</Button>
                            :
                            <Button className='lb1' variant='primary' disabled={disableButtons} onClick={e => handleRegister(e)}>Cadastrar</Button>
                        }
                        <Button className='lb2' variant='' disabled={disableButtons} onClick={handleClick}>{loginForm ? "Registrar" : "Já tem uma conta? Entrar."}</Button>
                    </div>
                </div>
                :
                <div className='login-logo center'>
                    <img className='flash' src="/imgs/logo/livraria-logo.png" alt="" />
                </div>
                }   
            </div>
        </div>   
    )
}