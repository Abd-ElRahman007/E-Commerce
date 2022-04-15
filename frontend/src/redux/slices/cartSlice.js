import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;

            if (existingCartItem) {
      
            const updateItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.payload.quantity
            }
                if (updateItem.quantity===0) {
                    state.items= [...state.items.slice(0, existingCartItemIndex), ...state.items.slice(existingCartItemIndex + 1)]
                }
                else {
                    updatedItems = [...state.items]
                    updatedItems[existingCartItemIndex] = updateItem;
                    state.items=[...updatedItems]
                } 
            }
            else {
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    image : action.payload.image ,
                    price : action.payload.price ,
                    currency : action.payload.currency ,
                    stock : action.payload.stock ,
                    vote_count : action.payload.vote_count ,
                    vote_total : action.payload.vote_total ,
                    quantity: action.payload.quantity,
                  //  total_price :[action.payload.quantity*action.payload.price]
                })
                
            }
        },
 
        removeFromCart: (state, action) => {

            state.items = state.items.filter((item) => item.id !== action.payload.id);


        },
 
        emptyAllCart: (state, action) => {

            state.items = []


        }

    }
})


export const { addToCart , removeFromCart , emptyAllCart} = cartSlice.actions

export default cartSlice.reducer

export const cartState = state => state.cart.items