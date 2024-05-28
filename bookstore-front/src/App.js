import { useState } from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home';
import Produtos from './components/Produtos';
import ProdutoPage from './components/ProdutoPage';
import Pedidos from './components/Pedidos';
import Carrinho from './components/Carrinho';
import Footer from './components/Footer';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import './App.css';

function App() {

  const [user, setUser] = useState({id: localStorage.userId, username: localStorage.username})
  const [cart, setCart] = useState(localStorage.getItem(`carrinho${user.id}`) ? JSON.parse(localStorage.getItem(`carrinho${user.id}`)) : [])

  function addToCart(p, quantidade, func){

  let newCart = cart
  let item = {}
  let itemFiltered = cart.filter((i) => i.product.id === p.id)

  if(itemFiltered.length){

    let cartItem = itemFiltered[0]
    let ind = cart.indexOf(cartItem)

    item = {
        product: p,
        quantity: cartItem.quantity + quantidade,
        unitValue: p.price,
        totalValue: Number(((cartItem.quantity + quantidade) * p.price)).toFixed(2)
    }

    newCart[ind] = item

  } else{

    item = {
        product: p,
        quantity: quantidade,
        unitValue: p.price,
        totalValue: Number((quantidade * p.price)).toFixed(2)
    }

    newCart.push(item)
  }

  setCart([...newCart])
  localStorage.setItem(`carrinho${user.id}`, JSON.stringify(newCart))
  func()
}

  return (
    <div className='app'>
      <Router>
        <Header user={user.username} setUser={setUser} cart={cart}></Header>
        <div className='paginas'>
          <Routes>
              <Route path = "/" exact element = {<Home/>}></Route>
              <Route path = "/produtos" exact element = {<Produtos user={user} addToCart={addToCart}/>}></Route>
              <Route path = "/acesso" element = {<Login setCart={setCart} setUser={setUser}/>}></Route>
              <Route path = "/pedidos" element = {<Pedidos user={user}/>}></Route>
              <Route path = "/carrinho" element = {<Carrinho userId={user.id} cart={cart} setCart={setCart}/>}></Route>
              <Route path = "/produtos/:id" element = {<ProdutoPage user={user} addToCart={addToCart}/>}></Route>
              <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;