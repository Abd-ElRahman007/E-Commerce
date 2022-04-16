import { useSelector } from "react-redux"
import { cartState } from "../../redux/slices/cartSlice"
import { List ,Group , Avatar,Text} from '@mantine/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';



export default function CartListItems() {

    const cartItems = useSelector(cartState)
    const totalCost = () => {
        let final = 0
        cartItems.map((item) => {  
            let itemTotal = 0
            itemTotal = item.quantity * item.price
            final = final + itemTotal
        })
        return final
    }

        const navigate=useNavigate()

    return (
        <>
        <List>
                {cartItems.map((item)=>{
                    return  <List.Item >
                                <Group noWrap> 
                                     <Avatar src={item.image} /> 
                          
                                     <div>
                                        <Text>{item.name}</Text>
                                        <Text size="xs" color="dimmed">
                                          {item.name}
                                        </Text>
                                      </div> 
                                    </Group> 
                               {/*  {item.name}{''}x{''}{item.quantity} */}
                                    </List.Item>
                             

                })

                }

        </List>

        <span>total: {totalCost()}</span>
        </>
    )
}
