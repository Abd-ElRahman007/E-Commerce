import React from 'react';
import { createStyles, Header,ActionIcon, Menu, Group, Center, Burger, Container, Autocomplete } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ChevronDown } from 'tabler-icons-react';
import { Search } from 'tabler-icons-react';
import { User, ShoppingCart } from 'tabler-icons-react';
import { Link, useNavigate } from 'react-router-dom';

import MenuInNav from './MenuInNav';
import UserLogin from './UserLogin'
import UserDisplay from './user/UserDisplay';


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
    const navigate = useNavigate()

    return (
        <Header height={56} mb={12}>
            <Container>
                <div className={classes.inner}>

                    <Link style={{textDecoration:'none',color:'black'}} to="./">
                    <h1>NavBar</h1>
                    </Link>
                    <Group className={"w-25"} >
                        <Autocomplete  /* styles={{   50 ,50 (other group)
                                    root: { width: '200px' } }} */
                            radius="lg"
                            className={classes.search, "w-100"}
                            placeholder="Search"
                            icon={<Search size={16} />}
                            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                        />

                    </Group>

                    <Group spacing={5} className={classes.links} >
                             <MenuInNav classes={classes}/>

                        <a
                            href=""
                            className={classes.link}
                            onClick={(event) => {
                                event.preventDefault()
                                navigate("./login")
                            }}
                        >
                            About

                        </a>
                        
                    </Group>


                    {/*  <Usernav/> */}
                    <ActionIcon component={Link} to="/cart" >
                      <ShoppingCart/>
                    </ActionIcon>
                    
                    <User/>
                    <UserDisplay/>
                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size="sm"
                    />
               <UserLogin name="Sprints" email="mockemail@example.com"/>                    
                </div>
            </Container>
        </Header>
    );
}