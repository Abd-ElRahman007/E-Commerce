import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme, Center,
    AspectRatio, Grid, Autocomplete, Menu, createStyles
} from '@mantine/core';
import { ChevronDown , ChevronLeft} from 'tabler-icons-react';
import { User, ShoppingCart  } from 'tabler-icons-react';
import { Search } from 'tabler-icons-react';
import { Link, useNavigate } from 'react-router-dom';


export default function Headerx() {

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


    const { classes } = useStyles();

    const navigate = useNavigate()







    return (
        <Header height={70} p="md">
            <Grid columns={200} gutter="sm">
                <Grid.Col span={25}> menu icon ?</Grid.Col>

                <Grid.Col span={100}>

                    <Autocomplete
                        radius="lg"
                        className={classes.search}
                        placeholder="Search"
                        icon={<Search size={16} />}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                    />



                </Grid.Col>

                <Grid.Col span={25}>

                    <Menu
                        trigger="hover"
                        delay={0}
                        transitionDuration={0}
                        placement="end"
                        gutter={1}
                        control={
                            <a className={classes.link}>

                                <Center>
                                    <span className={classes.linkLabel}>Browse Products</span>
                                    <ChevronDown size={12} />
                                </Center>
                            </a>
                        }
                    >
                        <Menu.Item component={Link} to="/newbrand"> By brand</Menu.Item>
                        <Menu.Item component={Link} to="/newcategory"> By category</Menu.Item>
                    </Menu>
                </Grid.Col>

                <Grid.Col span={25}>

                    <Menu
                        trigger="hover"
                        delay={0}
                        transitionDuration={0}
                        placement="end"
                        gutter={1}
                        control={
                            <a className={classes.link}>

                                <Center>
                                    <span className={classes.linkLabel}>nested head</span>
                                    <ChevronDown size={12} />
                                </Center>
                            </a>
                        }
                    >
                        <Menu.Item component={Menu}
                                        
                                        trigger="hover"
                                        delay={0}
                                        transitionDuration={0}
                                        placement="end"
                                        gutter={1}
                                        control={
                                            <>
                                            <a className={classes.link}>
                
                                                <Center>
                                                    <span className={classes.linkLabel}>inner menu</span>
                                                    <ChevronLeft size={12} />
                                                </Center>
                                            </a>
                                            <Menu.Item component={Link} to="/newcategory"> list</Menu.Item>
                                            </>
                                        }                > 
                        
                          <Menu.Item component={Link} to="/newcategory"> By category</Menu.Item>
                         </Menu.Item>





                        <Menu.Item component={Link} to="/newcategory"> By category</Menu.Item>
                    </Menu>
                </Grid.Col>

                <Grid.Col span={25}  >

                    <a
                        style={{ minWidth: "100%" }}
                        href=""
                        className={classes.link}
                        onClick={(event) => {
                            event.preventDefault()
                            navigate("./login")
                        }}
                    >
                        login/sign up

                    </a>

                </Grid.Col>
                <Grid.Col span={25}  >

                     <ShoppingCart />
                        
                </Grid.Col>

                <Menu
                        trigger="hover"
                        delay={0}
                        transitionDuration={0}
                        placement="end"
                        gutter={1}
                        control={
                            <a className={classes.link}>

                                <Center>
                                    <span className={classes.linkLabel}>Browse Products</span>
                                    <ChevronDown size={12} />
                                </Center>
                            </a>
                        }
                    >
                         <Menu
                        trigger="hover"
                        delay={0}
                        transitionDuration={0}
                        placement="start"
                        gutter={1}
                        position="left"
                        control={
                            <a className={classes.link}>

                                <Center>
                                    <span className={classes.linkLabel}>Browse Products</span>
                                    <ChevronDown size={12} />
                                </Center>
                            </a>
                        }
                    >
                        <Menu.Item component={Link} to="/newbrand"> By brand</Menu.Item>
                        <Menu.Item component={Link} to="/newcategory"> By category</Menu.Item>
                    </Menu>
                        <Menu.Item component={Link} to="/newcategory"> By category</Menu.Item>
                    </Menu>
              

            </Grid>
        </Header>
    )
}
