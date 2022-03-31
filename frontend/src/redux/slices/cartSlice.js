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
                    //extra code - add your logic
                    quantity: existingCartItem.quantity + action.payload.quantity
                }
    
                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updateItem;
                state.items=[...updatedItems]

            }
            else {
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    quantity: action.payload.quantity,

                })
            }

          /*   const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;
            if (existingCartItem) { */
              //  state.items[existingCartItemIndex].quantity =+ action.payload.quantity
                //Find the index and update the items
                /* const updateItem = {
                    ...existingCartItem,
                    //extra code - add your logic
                    quantity: existingCartItem.quantity + action.payload.quantity, */
                  /*   console.log("existingCartItem" , existingCartItem)
                }
                // }
                else {
                    state.items.push({
                        id: action.payload.id,
                        name: action.payload.name,
                        quantity: action.payload.quantity,

                    })
                }

 */

           /*  state.items.map((item, index) => {
                if (action.payload.id === item.id) {
                   state.items[index].quantity = state.items[index].quantity + action.payload.quantity
                 console.log("state.items[index].quantity" ,  state.items[index].quantity)
                     }

                else {
                    state.items.push({
                        id: action.payload.id,
                        name: action.payload.name,
                        quantity: action.payload.quantity,

                    })
                }


            })
 */
        }

    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer

export const cartState = state => state.cart.items