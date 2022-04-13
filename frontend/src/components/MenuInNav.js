import {
    createStyles,
    Header,
    Menu,
    Group,
    Center,
    Burger,
    Container,
    Loader,
    Select
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ChevronDown } from 'tabler-icons-react';
import { Search } from 'tabler-icons-react';
import { User, ShoppingCart } from 'tabler-icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import * as api from "../helpers/api"

export default function MenuInNav(props) {
    const classes = props.classes
    const [existingCategories, setExistingCategories] = useState()
    const [existingBrands, setExistingBrands] = useState()
    const getCategories = async () => {
        const data = await api.getCategories()
        setExistingCategories(data)
    }
    const getBrands = async () => {
        const data = await api.getBrands()
        setExistingBrands(data)
    }
    const navigate = useNavigate()

    useEffect(() => {
        getCategories()
        console.log("categories in backend ", exisitingCategories)
        getBrands()
        console.log("brands in backend ", existingBrands)
        return () => {
            setExistingCategories()
            setExistingBrands()
        }
    }, [])


    if (existingCategories === undefined && existingBrands === undefined)
        return (
            <Loader />
        )
    else
        return (
            <>
                <Menu
                    placement="end"
                    gutter={1}
                    className="w-50"
                    control={
                        <a className={classes.link}>

                            <Center>
                                <span className={classes.linkLabel}>Categories</span>
                                <ChevronDown size={12} />
                            </Center>
                        </a>
                    }
                >
                    {existingCategories?.map((x) => {
                        return <Menu.Item component={Link}
                            to={`/browse/${x.id}`}
                            state={{ type: "category" }}
                            key={x.id}
                        >
                            {x.name}</Menu.Item>
                    })}
                </Menu>
                <Menu
                    trigger="hover"
                    delay={0}
                    transitionDuration={0}
                    placement="start"
                    gutter={1}
                    position="bottom"
                    control={
                        <a className={classes.link}>

                            <Center>
                                <span className={classes.linkLabel}>Brands</span>
                                <ChevronDown size={12} />
                            </Center>
                        </a>
                    }
                >
                    {existingBrands?.map((x) => {
                        return <Menu.Item component={Link} to={"/car"} key={x.id}> {x.name}</Menu.Item>

                    })}
                </Menu>
            </>
        )
}
