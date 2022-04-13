import { Container, SimpleGrid, } from '@mantine/core';
import ProductThumb from '../ProductThumb';
import { cartState } from "../../redux/slices/cartSlice"
import { useSelector } from "react-redux"
import { useEffect } from 'react';


export default function Cart() {
    const cartItems = useSelector(cartState)
    const item = cartItems.map((item) => { // item not in use
        return item
    })


    const totalCost = () => {
        let final = 0
        cartItems.map((item) => {  //arrow function expect a return
            let itemTotal = 0
            itemTotal = item.quantity * item.price
            final = final + itemTotal
        })
        return final
    }

    console.log("totalll", totalCost())
    console.log("cartItems", cartItems)


    useEffect(() => {
        if (cartItems)
            totalCost()
        return () => {
        }
    }, [cartItems]) //React Hook useEffect has a missing dependency: 'totalCost'. Either include it or remove the dependency array

    return (
        <Container>
            <span>total : {totalCost()}  </span>
            <SimpleGrid cols={3} spacing="lg"
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]} >
                {cartItems.map((item) => (
                    <ProductThumb product={item}
                        key={item.id}
                        type="thumb" />
                ))
                }
            </SimpleGrid>


        </Container>
    )
}
