import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeAll, totalCost } from '../features/cart/cartSlice'
import CartItems from './CartItems'
import Checkout from './Checkout'

export default function CartList() {

  const [checkout, setCheckout] = useState(false)

  const { items,total } = useSelector((state)=>state.cart)

  

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(totalCost())
  },[items])

  function increaseQty(index) {
    items[index].quantity += 1
  }

  function handleCheckOut(e) {
    e.preventDefault()
    setSuccessCheckout(true)
  }



  return (
    <>
      {checkout && <div onClick={()=>setCheckout(false)} className='during-modal'></div>}
      <div className="container">
      <div className={checkout ? 'checkout-container active' : 'checkout-container'}>
        <Checkout checkout={()=>setCheckout(false)}/>
      </div>
      <ul className="cart">
        <Link to='/' className='link'>
        <button className='back-btn'>
          <span style={{color: 'white'}} className="material-symbols-outlined">

            keyboard_backspace

          </span>
        </button>
        </Link>

        {items.length > 0 
        ?
        <li className='cart-item'>
          {items.map((obj,index) => 
          {
            return <CartItems
              items={obj}
              key={obj.id}
              id={obj.id}
              image={obj.image}
              title={obj.title}
              price={obj.price}
              quantity={obj.quantity}
            />
          })}
          <div className="cart-checkout">
            <button onClick={()=>setCheckout(prev=>!prev)} className='checkout-btn'>Proceed checkout</button>
            <h1>total: {(total)}$</h1>
          </div>
          <button onClick={()=>dispatch(removeAll())} className='clear-btn'>Clear</button>
        </li>
        :
        <h1 className='empty'>Cart is empty</h1>
        }
      </ul>
    </div>
    </>
  )
}
