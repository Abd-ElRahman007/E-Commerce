import { createStyles, Header,ActionIcon, Menu, Group, Center,
    Burger, Container, Autocomplete, Text } from '@mantine/core';
   import { Login } from 'tabler-icons-react';
   import { User} from 'tabler-icons-react';
   import { useDispatch } from 'react-redux';
   import { authState } from "../../redux/slices/authSlice"
   import { useSelector } from "react-redux"
   import { Link } from 'react-router-dom';
   import { useState, useEffect } from "react";
   import UserMenu from '../UserMenu';
   
   
   export default function UserDisplay() {
   
       const userState = useSelector(authState)
   
       const {id} = userState
   
   
     /*   useEffect(() => {
           
           return () => {
              
           }
       }, [id]) */
   
   
       if (id)
           return (
               <UserMenu /> 
            )
           else 
                return (             
                       <Text size="sm" component={Link} to="/login" >
                           Login/Sign up
   
                         </Text>
           
                    )
   }
   
   
   {/* <ActionIcon component={Link} to="/login" >
   <Login/>
   </ActionIcon> */}