import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CartList from './components/CartList'
import Header from './components/Header'
import { getCartItems, totalCost } from './features/cart/cartSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'



function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCartItems())
  },[])
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path='/cart' element={<CartList/>}/>
      </Routes>
    </>
  )
}

export default App
