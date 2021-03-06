import { Group, useMantineTheme, ActionIcon } from '@mantine/core';
import { ShoppingCartPlus, ShoppingCartX, ShoppingCartOff } from 'tabler-icons-react';
import AddremoveButtons from '../AddremoveButtons';
import { useState } from 'react';


export default function CartActions({ quantity,
  cartAddFunction,
  increaseQuantity,
  decreaseQuantity,
  currentQuantity,
  cartRemoveFunction }) {
  const theme = useMantineTheme();
  const [full, setFull] = useState(false) //setFull not used


  return (
    <Group grow position="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
      <ActionIcon
        disabled={quantity === 0 || full === true      // <----------
          ? true
          : false}
        onClick={
          cartAddFunction
        }
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
  )
}
