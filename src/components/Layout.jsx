import React from 'react'
import Header from './Header'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'


export default function Layout() {
  const { items,products,isLoading} = useSelector((state)=>state.cart)
  console.log(items)
  if (isLoading) return <h1 className='loading'>Loading...</h1>
  return (
    <div>

      <div className='container'>
        <ul className="card-list">
          {products.map(obj =>{
            return <Card 
              key={obj.id}
              id={obj.id}
              obj={obj}
              title={obj.title}
              price={obj.price}
              img={obj.image}
            />
          })}
        </ul>
      </div>
    </div>
  )
}
