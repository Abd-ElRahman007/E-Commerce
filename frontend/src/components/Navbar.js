import React , { forwardRef }  from 'react'
import { createStyles, Header, ActionIcon, Group, Burger, Container, Autocomplete ,Avatar,Text } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ShoppingCart } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import MenuInNav from './MenuInNav';
import UserDisplay from './user/UserDisplay';
import SearchNav from './SearchNav';
import { useNavigate } from "react-router-dom";


import { useState , useEffect , useRef} from 'react';

import * as api from "../helpers/api"
const useStyles = createStyles((theme) => ({
    search: {
        border: 'none',
    },
    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: 5,
    },
}));



export function Navbar() {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes } = useStyles();

    const [products, setProducts] = useState([])

    const query = useRef(null);
    const navigate=useNavigate()


 
    const Search = async (q)=>{
        if (q === "" ||  q === undefined || q ===null)
              {setProducts([])}
          else 
            { const SearchedData = await api.searchProducts(q)               
                setProducts(SearchedData)
             }                                 
             }


    const SearchedProducts =()=>{   

        let results=[]

        products?.forEach( (x)=>{
               results.push( { value :x.name ,
                               id : x.id ,
                               image :x.image,
                               price :x.price })             
          })      
       return results

    }

    useEffect(() => {
        if (query.current.value === "" ||  query.current.value ===  undefined || query.current.value === null)
        setProducts([]) 
        else
        Search(query.current.value)
        
          return () => {
            setProducts([])             
          };
          }, [query]);

    return (
        <Header height={56} mb={12}>
            <Container>
                <div className={classes.inner}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="./">
                        <h2>Home</h2>
                    </Link>
                    <Group className={"w-25"} >

                    <Autocomplete 
                            transition="pop-top-left"
                            transitionDuration={80}
                            transitionTimingFunction="ease"
                            radius="lg"
                            limit={10}
                            className={[classes.search, "w-100"]}
                            placeholder="Search"
                         
                            data={SearchedProducts()}
                            ref={query}
                            itemComponent={forwardRef(({value, id, image,price,...others}, query) => {
                                
                              return (
                                <div {...others}  ref={query}>                     
                                                         
                                 <Group noWrap> 
                                     <Avatar src={image} /> 
                          
                                     <div>
                                        <Text>{value}</Text>
                                        <Text size="xs" color="dimmed">
                                          {price}
                                        </Text>
                                      </div> 
                                    </Group>                        
                                   
                              </div>  
                              )
                            })}
                            onChange={() => {Search(query.current.value)                    
                             }}
              
              
                             onItemSubmit={(item) => 
                                navigate(`/ProductOverview/${item.id}`)  
                              }
                />


                    </Group>
                    <Group spacing={5} className={classes.links} >
                        <MenuInNav classes={classes} />
                    </Group>
                    <ActionIcon component={Link} to="/cart" >
                        <ShoppingCart />
                    </ActionIcon>
                    <UserDisplay />
                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size="sm"
                    />
                </div>
            </Container>
        </Header>
    );
}
