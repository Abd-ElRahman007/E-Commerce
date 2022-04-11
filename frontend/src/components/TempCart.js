
import { useSelector } from "react-redux"
import { cartState } from "../redux/slices/cartSlice"

export default function TempCart() {

    const cartItems = useSelector(cartState)
    console.log("cartItems" ,  cartItems)
    
    return (
        <div>
            <h2>Cart</h2>
            <p>items in Cart : {cartItems.map((item)=>  item.name+item.id + " , quantity : " + item.quantity +" price "+item.price)} </p>
            <p>Number of items :  </p>
            <p>total cost :  </p>
        </div>
    )
}
