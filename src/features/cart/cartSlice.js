import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const items = JSON.parse(localStorage.getItem('items')) !== null 
? JSON.parse(localStorage.getItem('items')) : [];

const amount = JSON.parse(localStorage.getItem('amount')) !== null 
? JSON.parse(localStorage.getItem('amount')) : 0;

const total = JSON.parse(localStorage.getItem('total')) !== null 
? JSON.parse(localStorage.getItem('total')) : 0;


const initialState = {
  products: [],
  items: items,
  amount: amount,
  total: total,
  isLoading: false,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (arg) => {
    const response = await axios.get('https://fakestoreapi.com/products/')
    return response.data.map(x => ({...x, quantity: 1}))
  },
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeAll: (state) => {
      const removeAll = {...state, items: [], amount: 0,total: 0}
      localStorage.setItem('items', JSON.stringify(removeAll.items))
      localStorage.setItem('amount', JSON.stringify(removeAll.amount))
      localStorage.setItem('total', JSON.stringify(removeAll.total))
      return removeAll
    },
    addItem: (state,action) => {
      const itemsIndex = state.items.findIndex(obj => obj.id == action.payload.id)
      if (itemsIndex !== -1) {
        state.items[itemsIndex] = {...state.items[itemsIndex]}
        state.amount == 1
      } else {
        state.items.push(action.payload)
        state.amount += 1
      }
      localStorage.setItem('items', JSON.stringify(state.items))
      localStorage.setItem('amount', JSON.stringify(state.amount))
    },
    removeItem: (state,action) =>{
      const items = state.items.filter(obj => obj.id !== action.payload)
      state.items = items
      state.amount -= 1
      localStorage.setItem('items', JSON.stringify(state.items))
      localStorage.setItem('amount', JSON.stringify(state.amount))
    },
    totalCost: (state) => {
      let {total, quantity} = state.items.reduce((cartTotal, cartItem)=>{
        const {price, quantity} = cartItem
        cartTotal.total += price * quantity

        return cartTotal
      },{
        total: 0,
        quantity:0
      })
      state.total = total.toFixed(2)
    },
    increaseQuantity: (state,action) => {
      const items = state.items.findIndex(obj => obj.id === action.payload.id)
 
      state.items[items].quantity += 1
      localStorage.setItem('items', JSON.stringify(state.items))
    },
    decreaseQuantity: (state,action) => {
      const items = state.items.findIndex(obj => obj.id === action.payload.id)

      if (state.items[items].quantity === 1) {
        const item = state.items.filter(obj => obj.id !== action.payload.id)
        state.items = item
        state.amount -= 1
      } else {
        state.items[items].quantity -= 1
      }
      localStorage.setItem('items', JSON.stringify(state.items))
      localStorage.setItem('amount', JSON.stringify(state.amount))
    }
  },
  extraReducers: (builder)=> {
    builder.addCase(getCartItems.pending, (state)=> {
      state.isLoading = true
    })
    builder.addCase(getCartItems.fulfilled, (state, action)=> {
      state.isLoading = false
      state.products = action.payload
      localStorage.setItem('products', JSON.stringify(state.products))
    })
    builder.addCase(getCartItems.rejected, (state, action)=>{
      state.error = action.error.message;
    })
  }
})

export const { 
  removeAll, 
  addItem, 
  removeItem, 
  totalCost,
  increaseQuantity,
  decreaseQuantity
} = cartSlice.actions
export default cartSlice.reducer