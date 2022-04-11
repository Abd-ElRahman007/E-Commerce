
import {
  Card, Image, Text, Badge, Button, Group, useMantineTheme,
  ActionIcon, ColorSchemeProvider
} from '@mantine/core';
import { useState, useEffect } from 'react';
import AddremoveButtons from './AddremoveButtons';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { cartState } from "../redux/slices/cartSlice"
import { useSelector } from "react-redux"
import { showNotification } from '@mantine/notifications';
import { ShoppingCartPlus, ShoppingCartX, ShoppingCartOff, LetterX, Tournament, ShoppingCart } from 'tabler-icons-react';
import Rating from '@mui/material/Rating';
import {useNavigate}from 'react-router-dom'

import { authState } from "../redux/slices/authSlice"

import { HashLink } from 'react-router-hash-link';


export default function ProductThumb(props) {
  const { id, name, image, price, currency, stock, vote_count, vote_total } = props.product
  //  console.log(" , props", props)
  const theme = useMantineTheme();

  const [quantity, setQuantity] = useState(1)
  const [currentQuantity, setCurrentQuantity] = useState(0)
  const [full, setFull] = useState(false)

  const user = useSelector(authState)
  console.log("userId", user.id)
  const cartItems = useSelector(cartState)
  //console.log("cartItems" , cartItems ) 
  const quantityInCart = cartItems.filter((item) => {

    return id === item.id

  })
  //console.log("quantityInCart", quantityInCart.quantity, "this id", id)
  const thisQ = quantityInCart[0]
  // console.log("thisQ", thisQ, "this id", id)

  const increaseQuantity = () => {
    // stock logic here 
    if (currentQuantity > 0) {
      if (quantity == stock - currentQuantity)
        return
      /*  else if (currentQuantity == stock)
         return setFull(true) */

    }
    if (quantity == stock)
      return;
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

    if (currentQuantity == stock)
      setFull(true)
    const number = quantity - 1
    setQuantity(number)
    setFull(false)

  }

  const dispatch = useDispatch()

  const notZero = () => {
    if (quantity === 0)
      alert("dont enter zero")
  }


  const cartAddFunction = (id, name, image, price, quantity, stock, vote_count, vote_total) => {
    if (currentQuantity == stock && quantity > 0) {
      showNotification({
        title: "invalid ",
        message: `${name} cant be added ,no more in stock`,
        color: 'yellow',
        icon: <LetterX />
        // radius and other props can be added 
        // inner stylings to title/message/etc  can be done 
      })
      setFull(true)
      return
    }
    else setFull(false)
    if (quantity === 0) {
      showNotification(message())
      return
    }
    dispatch(addToCart({ id, name, image, price, quantity, stock, vote_count, vote_total }))
    setQuantity(1)
    showNotification(message())

  }


  const cartRemoveFunction = () => {

    dispatch(removeFromCart({ id }))
    setQuantity(1)
    showNotification({
      title: "Cart changed",
      message: `${name} has been removed from the cart`,
      color: 'red',
      icon: <ShoppingCartX />
      // radius and other props can be added 
      // inner stylings to title/message/etc  can be done 
    })
    setFull(false)

  }


  const message = () => {
    if (quantity === 0)
      return { title: "invalid amount", message: "0 is not a valid quantity" }
    if (currentQuantity === 0)
      return { title: "Cart changed", message: `${name} has been added to the cart`, icon: <ShoppingCartPlus />, color: "green" }

    else if (currentQuantity > 0 && quantity < 0 && currentQuantity === -quantity)
      return { title: "Cart changed", message: `${name} has been removed from the cart`, icon: <ShoppingCartX />, color: "red" }

    else if (currentQuantity > 0 && quantity < 0)
      return { title: "Cart changed", message: `${name} has been decreased by ${-quantity}`, icon: <ShoppingCartX />, color: 'pink' }

    else if (currentQuantity > 0 && quantity > 0)
      return { title: "Cart changed", message: `${name} has been increased by ${quantity}`, icon: <ShoppingCartPlus />, color: "green" }




  }


  useEffect(() => {
    if (thisQ)
      setCurrentQuantity(thisQ.quantity)


    return () => {
      setCurrentQuantity(0)
    }
  }, [cartItems, thisQ])

let navigate=useNavigate();

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
			  onClick={(event) => {
                    event.preventDefault()
                    navigate(`./ProductOverview/${id}`)
                }}
			style={{cursor:'pointer'}}
            />
          </Card.Section>

          <Group position="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <Text weight={500}>{name}</Text>

            <HashLink smooth to={user.id === null
                                  ? '/login'
                                  : '/cart'   /* product view feedback section  */
                                     }
            >
              <Rating name="read-only"
                      size="small"
                      value={vote_total || vote_count == 0
                            ? 0
                            : vote_total / vote_count
                                }
                      readOnly={user.id === null
                            ? true
                            : false
                                }
                    />
            </HashLink>
            <Badge color="pink" variant="light" size="xl" >
              {price} {currency}
            </Badge>
          </Group>

          {/* <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text> */}
          <Group grow position="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <ActionIcon
              disabled={quantity === 0 || full === true      // <----------
                        ? true
                        : false}
              onClick={() => {
                cartAddFunction(id, name, image, price, quantity, stock, vote_count, vote_total)

                /*  dispatch(addToCart( {id , name , main_image , price , quantity} ))
                 setQuantity(1)
  
                 showNotification({
                   title: 'Default notification',
                   message: message()  ,
                 }) */
              }}
            >

              {quantity > 0
                ? <ShoppingCartPlus size={30} color={'#40bf59'} />
                : <ShoppingCartX size={30} color={'#d279c6'} />

                     }

            </ActionIcon>
            <AddremoveButtons
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              quantity={quantity}
            />

            {currentQuantity > 0 &&
              <ActionIcon onClick={() => { cartRemoveFunction() }}>
                <ShoppingCartOff size={30} color={'red'} />
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