import React from 'react';
import { createStyles, Header, ActionIcon, Group, Burger, Container, Autocomplete } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Search } from 'tabler-icons-react';
import { ShoppingCart } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import MenuInNav from './MenuInNav';
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

    return (
        <Header height={56} mb={12}>
            <Container>
                <div className={classes.inner}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="./">
                        <h2>Home</h2>
                    </Link>
                    <Group className={"w-25"} >
                        <Autocomplete
                            radius="lg"
                            className={[classes.search, "w-100"]}
                            placeholder="Search"
                            icon={<Search size={16} />}
                            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
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
