import { createStyles, Header,ActionIcon, Menu, Group, Center,
 Burger, Container, Autocomplete, Text } from '@mantine/core';
import { Login } from 'tabler-icons-react';

import { useDispatch } from 'react-redux';
import { cartState } from "../../redux/slices/cartSlice"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';

export default function UserDisplay() {

  



    return (             
                    <Text size="sm" component={Link} to="/login" >
                        Login/Sign up

                      </Text>
        
    )
}


{/* <ActionIcon component={Link} to="/login" >
<Login/>
</ActionIcon> */}