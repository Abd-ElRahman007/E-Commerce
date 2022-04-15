import { Container, SimpleGrid, Button, Group , Badge } from '@mantine/core';
import ProductThumb from '../ProductThumb';
import { cartState, emptyAllCart } from "../../redux/slices/cartSlice"
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


export default function Cart() {
    const cartItems = useSelector(cartState)
    const item = cartItems.map((item) => { // item not in use
        return item
    })

    console.log("cartItems.length", cartItems.length)
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

    const dispatch = useDispatch()


    useEffect(() => {
        if (cartItems)
            totalCost()
        return () => {
        }
    }, [cartItems]) //React Hook useEffect has a missing dependency: 'totalCost'. Either include it or remove the dependency array

    return (
        <Container >
                <Group position="right" spacing="sm">
                <Badge color="gray" size="xl" radius="xs" variant="outline">Total Cost</Badge>
                <Badge color="gray" size="xl" radius="xs" variant="outline">{totalCost()} EGP </Badge>
                </Group>
 
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


            {cartItems.length > 0 &&
                <Group grow position="right" style={{ width: "50%" }}>
                    <Button fullWidth color="green">
                        Checkout
                    </Button>
                    <Button fullWidth color="red"
                             onClick={() => { dispatch(emptyAllCart()) }}>                                  
                        Empty the cart </Button>
                </Group>
            }




            {/*    <SimpleGrid cols={2} spacing="lg" style={{maxWidth:"50%"}}>
            <Button color="red" >1
                </Button>

                <Button variant="outline">2</Button>

            </SimpleGrid> */}

        </Container>
    )
}
