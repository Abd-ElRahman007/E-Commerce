import {
  Card, Image, Text, Badge, Group, useMantineTheme,
  ActionIcon, Container, Grid, SimpleGrid
} from '@mantine/core';
import { useState, useEffect } from 'react';
import AddremoveButtons from './AddremoveButtons';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { cartState } from "../redux/slices/cartSlice"
import { useSelector } from "react-redux"
import { showNotification } from '@mantine/notifications';
import { ShoppingCartPlus, ShoppingCartX, ShoppingCartOff, LetterX } from 'tabler-icons-react';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom'
import { authState } from "../redux/slices/authSlice"
import { HashLink } from 'react-router-hash-link';
import { Image as ImageOverview, Name, Rating as AbdoRating, Price, Description } from "./productOverviewComponents/componentExport"


export default function ProductThumb(props) {
  const { id, name, image, price, currency, stock, vote_count, vote_total, description, model } = props.product
  const theme = useMantineTheme();
  const [quantity, setQuantity] = useState(1)
  const [currentQuantity, setCurrentQuantity] = useState(0)
  const [full, setFull] = useState(false)
  const [type, setType] = useState("thumb")
  console.log("typeeeee", type)
  const user = useSelector(authState)
  const cartItems = useSelector(cartState)
  const quantityInCart = cartItems.filter((item) => {
    return id === item.id
  })
  const thisQ = quantityInCart[0];
  const increaseQuantity = () => {
    // stock logic here
    if (currentQuantity > 0) {
      if (quantity == stock - currentQuantity) //expected ===
        return
    }
    if (quantity == stock) //expected ===
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

    if (currentQuantity == stock)//expected ===
      setFull(true)
    const number = quantity - 1
    setQuantity(number)
    setFull(false)

  }

  const dispatch = useDispatch()

  const notZero = () => { //notZero not assigned to anything
    if (quantity === 0)
      alert("dont enter zero")
  }

  const cartAddFunction = (id, name, image, price, quantity, stock, vote_count, vote_total) => {
    if (currentQuantity == stock && quantity > 0) { // expected ===
      showNotification({
        title: "invalid ",
        message: `${name} cant be added ,no more in stock`,
        color: 'yellow',
        icon: <LetterX />
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
    setType(props.type)
    if (thisQ)
      setCurrentQuantity(thisQ.quantity)

    return () => {
      setCurrentQuantity(0)
    }
  }, [cartItems, thisQ])//React Hook useEffect has a missing dependency: 'props.type'. Either include it or remove the dependency array. If 'setType' needs the current value of 'props.type', you can also switch to useReducer instead of useState and read 'props.type' in the reducer

  let navigate = useNavigate();

  return (
    <>
      <div style={{ width: "90%", margin: 'auto' }}>
        <Card shadow="sm" p="lg">
          {type === "thumb"
            ? <Card.Section>
              <Image src={image}
                alt="Product"
                radius={10}
                height={180}
                fit="contain"
                onClick={(event) => {
                  event.preventDefault()
                  navigate(`/ProductOverview/${id}`)
                }}
                style={{ cursor: 'pointer' }}
              />
            </Card.Section>
            : <>
              <Container my="md">   {/*  productOverview old code  */}
                <SimpleGrid
                  cols={2}
                  spacing="md"
                  breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  <ImageOverview dim={{ width: "300px" }}
                    image={image}
                    title={name}
                  />
                  <Grid gutter="md">
                    <Grid.Col>
                      <Name name={[name, ' ', model]} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Price price={price} currency={currency} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <AbdoRating data={{
                        label: 'Rating',
                        stats: [vote_total, ' / 10'],
                        color: 'green',
                        icon: 'up',
                        progress: vote_total / vote_count * 100
                      }} />
                    </Grid.Col>
                  </Grid>
                </SimpleGrid>
                <Description description={description} label="Description" />
              </Container>
             {/*  <HashLink smooth to={user.id === null
                ? '/login'
                : '/cart'   
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
              </HashLink> */}
            </>
          }

          {type === "thumb"
            ? <Group position="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Text weight={500}>{name}</Text>

              <HashLink smooth to={user.id === null
                ? '/login'
                : '/cart'   /* product view feedback section  */
              }
              >
                <Rating name="read-only"
                  size="small"
                  value={vote_total || vote_count == 0
                    ? 3
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
            : null
          }
          <Group grow position="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <ActionIcon
              disabled={quantity === 0 || full === true      // <----------
                ? true
                : false}
              onClick={() => {
                cartAddFunction(id, name, image, price, quantity, stock, vote_count, vote_total)
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


/* {type === "thumb"
? <Group position="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
  <Text weight={500}>{name}</Text>

  <HashLink smooth to={user.id === null
    ? '/login'
    : '/cart'  
  }
  >
    <Rating name="read-only"
      size="small"
      value={vote_total || vote_count == 0
        ? 3
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
: null
} */