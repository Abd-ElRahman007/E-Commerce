
import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import AddremoveButtons from './AddremoveButtons';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { cartState } from "../redux/slices/cartSlice"
import { useSelector } from "react-redux"





export default function ProductThumb(props) {
 const  {id , name , main_image ,price} = props.product
    const theme = useMantineTheme();
    const [quantity, setQuantity] = useState(1)
// console.log("iddddd" , id)
    const cartItems = useSelector(cartState)

    const increaseCount=()=>{
        const number =quantity+1
        setQuantity(number)

    }


    const decreaseCount=()=>{
        if (quantity <= 1)  
         return; 
         const number =quantity-1
         setQuantity(number)

    }

    const dispatch = useDispatch()

    const addCart=(id)=>{
      dispatch(addToCart(id))
      console.log("ccccc" , id)

    }

    return (
        <div style={{ width: 340, margin: 'auto' }}>
        <Card shadow="sm" p="lg">
          <Card.Section>
            <Image src={main_image}
                   alt="Product" 
                    radius={10}
                   
             />
          </Card.Section>
  
          <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <Text weight={500}>{name}</Text>
            <Badge color="pink" variant="light" size="xl" >
              {price}
            </Badge>
          </Group>
  
          {/* <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text> */}
             <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Button variant="light" 
                  color="blue" 
                  style={{ marginTop: 14 }}
                  onClick={()=>{
                    dispatch(addToCart( {id , name , quantity} ))
                    }}
           >
            Add to Cart 
          </Button>
            <AddremoveButtons
                increaseCount={increaseCount}
                decreaseCount={decreaseCount}
                quantity={quantity}
                    />
          </Group>
        </Card>
      </div>
    )
}
