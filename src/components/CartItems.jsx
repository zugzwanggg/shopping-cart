import React from 'react'
import { useDispatch } from 'react-redux'
import { increaseQuantity, decreaseQuantity , removeItem, totalCost } from '../features/cart/cartSlice'

export default function CartItems(props) {

  const dispatch = useDispatch()




  return (
    <div className='cart-info'>
      <img src={props.image} alt="" />
      <div>
        <h1>{props.title}</h1>
        <h3>{(props.price * props.quantity).toFixed(2)}$</h3>
      </div>
      <div className='cart-action'>
        <div className="cart-item__quantity">
          <button onClick={()=>dispatch(decreaseQuantity(props.items))}>
            <span className="material-symbols-outlined">
               expand_more
            </span>
          </button>

          <h3>{props.quantity}</h3>

          <button onClick={()=>dispatch(increaseQuantity(props.items))}>
            <span className="material-symbols-outlined">
              expand_less
            </span>
          </button>
        </div>
        <button className='remove' onClick={()=>dispatch(removeItem(props.id))}>Remove</button>
      </div>
    </div>
  )
}