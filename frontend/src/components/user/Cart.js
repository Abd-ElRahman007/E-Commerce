import { Loader, Grid, Skeleton, Container , SimpleGrid,Text} from '@mantine/core';
import ProductThumb from '../ProductThumb';
import { cartState } from "../../redux/slices/cartSlice"
import { useSelector } from "react-redux"


export default function Cart() {

    const cartItems = useSelector(cartState)

   console.log("cartItems" , cartItems ) 
    return (
        <Container>
                <SimpleGrid>

                     


                </SimpleGrid>


        </Container>
    )
}
