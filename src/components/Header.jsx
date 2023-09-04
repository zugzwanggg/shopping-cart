import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
  const { amount } = useSelector((state)=>state.cart)
  return (
    <header>
      <div className="container">
      <nav>
        <ul>
          <li>
          <Link to='/'><h1>Logo</h1></Link>
          </li>
          <li>
            <Link to='/cart'>
              <span className="material-symbols-outlined">
                shopping_cart
              </span> 
              {amount > 0 && <p className='amount'>{amount}</p>}
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  )
}
