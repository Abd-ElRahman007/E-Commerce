
import { Card, Image, Text, Badge, Button, Group, useMantineTheme,
        ActionIcon ,  ColorSchemeProvider } from '@mantine/core';
import { useState, useEffect } from 'react';
import AddremoveButtons from './AddremoveButtons';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { cartState } from "../redux/slices/cartSlice"
import { useSelector } from "react-redux"
import { showNotification } from '@mantine/notifications';
import { ShoppingCartPlus , ShoppingCartX, ShoppingCartOff , Tournament, ShoppingCart } from 'tabler-icons-react';
import Rating from '@mui/material/Rating';

export default function ProductThumb(props) {
  const { id, name, image, price ,currency } = props.product
  console.log(" , props", props)
  const theme = useMantineTheme();

  const [quantity, setQuantity] = useState(1)
  const [currentQuantity, setCurrentQuantity] = useState(0)

  const cartItems = useSelector(cartState)
  // console.log("cartItems" , cartItems ) 
  const quantityInCart = cartItems.filter((item) => {

    return id === item.id

  })
  console.log("quantityInCart", quantityInCart.quantity, "this id", id)
  const thisQ = quantityInCart[0]
  console.log("thisQ", thisQ, "this id", id)

  const increaseQuantity = () => {
    // stock logic here 
    const number = quantity + 1
    setQuantity(number)

  }


  const decreaseQuantity = () => {
    if (currentQuantity > 0) {
      if (quantity <= -currentQuantity)
        return;

    }
    else
      if (quantity <= 1) return

    const number = quantity - 1
    setQuantity(number)

  }

  const dispatch = useDispatch()

  const notZero = () => {
    if (quantity === 0)
      alert("dont enter zero")
  }


  const cartAddFunction = (id, name, image, price, quantity) => {
    if (quantity === 0) {
      showNotification(message())
      return
    }
    dispatch(addToCart({ id, name, image, price, quantity }))
    setQuantity(1)
    showNotification(message())
  }


  const cartRemoveFunction = () => {

    dispatch(removeFromCart({ id }))
    setQuantity(1)
    showNotification({
       title: "Cart changed",
        message: `${id} has been removed from the cart` ,
        color: 'red',
        icon: <ShoppingCartX />
        // radius and other props can be added 
        // inner stylings to title/message/etc  can be done 
       })

  }


  const message = () => {
    if (quantity === 0)
      return { title: "invalid amount", message: "0 is not a valid quantity" }
    if (currentQuantity === 0)
      return { title: "Cart changed", message: `${id} has been added to the cart`,icon: <ShoppingCartPlus /> }

    else if (currentQuantity > 0 && quantity < 0 && currentQuantity === -quantity)
      return { title: "Cart changed", message: `${id} has been removed from the cart`,icon: <ShoppingCartX /> ,color:"red" }

    else if (currentQuantity > 0 && quantity < 0)
      return { title: "Cart changed", message: `${id} has been decreased by ${-quantity}` ,icon: <ShoppingCartX /> }

    else if (currentQuantity > 0 && quantity > 0)
      return { title: "Cart changed", message: `${id} has been increased by ${quantity}` ,icon: <ShoppingCartPlus /> }

      


  }
 

  useEffect(() => {
    if (thisQ)
      setCurrentQuantity(thisQ.quantity)

    return () => {
      setCurrentQuantity(0)
    }
  }, [cartItems, thisQ])



  return (
    <>
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={image}
            alt="Product"
            radius={10}
            height={180} 
            fit="contain"

          />
        </Card.Section>

        <Group position="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{name}</Text>

          <Rating name="read-only" size="small" value={2} readOnly />

          <Badge color="pink" variant="light" size="xl" >
            {price}{currency} 
          </Badge>
        </Group>

        {/* <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text> */}
        <Group  grow position="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <ActionIcon 
           
           
            disabled={quantity===0
                      ? true 
                      :false}
            onClick={() => {
              cartAddFunction(id, name, image, price, quantity)

              /*  dispatch(addToCart( {id , name , main_image , price , quantity} ))
               setQuantity(1)

               showNotification({
                 title: 'Default notification',
                 message: message()  ,
               }) */
            }}
          >

              {  quantity > 0
                 ?<ShoppingCartPlus  size={30}color={'#40bf59'}/>
                : <ShoppingCartX   size={30} color={'#d279c6'}/>

              }
           
          </ActionIcon>
          <AddremoveButtons
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            quantity={quantity}
          />

          {currentQuantity > 0 && 
            <ActionIcon  onClick={() => {cartRemoveFunction()}}>

              <ShoppingCartOff size={30} color={'red'}/>
            </ActionIcon>
            
             
          }

        </Group>
      </Card>
    </div>
    </>
  )
}


 {/* <button onClick={() => {cartRemoveFunction()}}>
                remove
              </button> */}


            /*   <Button variant="light"
            color="blue"
            style={{ marginTop: 14 }}
            disabled={quantity===0
                      ? true 
                      :false}
            onClick={() => {
              cartAddFunction(id, name, image, price, quantity)   
            }}
          >
             Add to Cart
          </Button> */