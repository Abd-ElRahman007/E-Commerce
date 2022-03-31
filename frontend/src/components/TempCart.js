import { NavItem } from "react-bootstrap"
import { useSelector } from "react-redux"
import { cartState } from "../redux/slices/cartSlice"

export default function TempCart() {

    const cartItems = useSelector(cartState)
    console.log("cartItems" ,  cartItems)
    
    return (
        <div>
            <h2>Cart</h2>
            <p>items in Cart : {cartItems.map((item)=>  item.name +",")} </p>
            <p>Number of items : {cartItems.quantity} </p>
            <p>total cost :  </p>
        </div>
    )
}
