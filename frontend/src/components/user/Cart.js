import {
    Loader, Grid, Skeleton, Container, SimpleGrid,
    Image, Text
} from '@mantine/core';
import ProductThumb from '../ProductThumb';
import { cartState } from "../../redux/slices/cartSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react';


export default function Cart() {

    const cartItems = useSelector(cartState)
   // const [total, setTotal] = useState(0)

    const item = cartItems.map((item) => {

        return item
    })


    const totalCost = () => {
        let final = 0
        /* let totalQuantiy = 0
        let totalPrice = 0 */
        cartItems.map((item) => {
            let itemTotal=0
           /*  totalQuantiy += item.quantity
            totalPrice += item.price */
            itemTotal =item.quantity * item.price
            final= final+itemTotal
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

    }, [cartItems])


   /*  useEffect(() => {
        setTotal(0)
        if (cartItems)
            setTotal(0)
             totalCost()
        setTotal(totalCost())

         return () => {
             setTotal(0)
         }

    }, [cartItems]) */



    return (
        <Container>


            <SimpleGrid cols={3} spacing="lg"
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]} >
                    <span>total : {totalCost()}  </span>
                {cartItems.map((item) => (

                    <ProductThumb product={item} key={item.id} />
                ))

                }


            </SimpleGrid>


        </Container>
    )
}
