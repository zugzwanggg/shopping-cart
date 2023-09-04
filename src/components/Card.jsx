import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'

export default function Card(props) {
  const dispatch = useDispatch()
  return (
    <div className='card-container'>
      <div className="card">
      <img src={props.img} alt={props.title} />

        <div className="card-info">
          <h3>{props.title}</h3>
          <small>{props.price}$</small>
        </div>
      </div>
      <button onClick={()=>dispatch(addItem(props.obj))}>Add</button>
    </div>
  )
}
