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
                    main_image : action.payload.main_image ,
                    price : action.payload.price ,
                    quantity: action.payload.quantity,
                })
            }
        }
    }
})


export const { addToCart , removeQuantityCart} = cartSlice.actions

export default cartSlice.reducer

export const cartState = state => state.cart.items