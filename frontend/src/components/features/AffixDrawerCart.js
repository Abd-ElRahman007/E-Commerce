import { ShoppingCart } from 'tabler-icons-react';
import { Affix, Button, Text, Transition , ActionIcon , Drawer} from '@mantine/core';
import { useState, useEffect } from 'react';
import CartListItems from '../user/CartListItems';

export default function AffixDrawerCart() {

    const [opened, setOpened] = useState(false);


    return (
            <>
        <Drawer position="right"
                size="lg"
                padding="xl"
                opened={opened}
                onClose={() => setOpened(false)}
                title="Cart"
                
                
          >
       <CartListItems/>
      </Drawer>


        <Affix position={{ top: 100, right: 10 }}>
        <Transition transition="slide-up" mounted={true}>
          {(transitionStyles) => (
            <ActionIcon onClick={() => setOpened(true)} >
            
              <ShoppingCart size={30} />
         
          </ActionIcon>
          )}
        </Transition>
      </Affix>
            </>
    )
}
