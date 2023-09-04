import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Checkout(props) {
  const {total} = useSelector((state)=> state.cart)

  const [fullName,setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address,setAddress] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [success, setSuccess] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    if (phoneNumber.length !== 11) {
      setInvalid(true)
    } else if (address.length < 1) {
      setInvalid(true)
    } else if (fullName.length < 3) {
      setInvalid(true)
    } else {
      setInvalid(false)
      setSuccess(true)
    }
  }
  function handleBack() {
    setSuccess(false)
    props.checkout()
  }

  return (
    <div>
      {!success
      ?
      <form onSubmit={(e)=>onSubmit(e)} action="">
        
      <label htmlFor="fullname">Full Name</label>
      <input id='fullname' onChange={(e)=>setFullName(e.target.value)} value={fullName} placeholder='Full Name' type="text" />
      <label htmlFor="address">Address</label>
      <input id='address' onChange={(e)=>setAddress(e.target.value)} value={address} placeholder='Address' type="text" />
      <label htmlFor="phonenumber">Phone Number</label>
      <input id='phonenumber' onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} placeholder='7777777777' type="number" />
      {fullName.length < 3 && <small>Invalid Full Name <br/> At least 3 characters</small>}
      {invalid && <small>Invalid</small>}
      <button>{total}$</button>
      </form>
      :
      <div className="success">
        <h1>
        Succesfully
      </h1>
      <button onClick={()=>handleBack()}>Back</button>
      </div>
      }
    </div>
  )
}
