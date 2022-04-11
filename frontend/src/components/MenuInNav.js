import {
    createStyles,
    Header,
    Menu,
    Group,
    Center,
    Burger,
    Container,
    Loader
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

    const [exisitingCategories, setExisitingCategories] = useState()
    const [existingBrands, setExistingBrands] = useState()

    const getCategories = async () => {
        const data = await api.getCategories()
        setExisitingCategories(data)
    }

    const getBrands = async () => {
        const data = await api.getBrands()
        setExistingBrands(data)
    }





    useEffect(() => {
        getCategories()
        console.log("categoies in backend ", exisitingCategories)

        getBrands()
        console.log("brands in backend ", existingBrands)


        return () => {

            setExisitingCategories(
                setExistingBrands()
            )   
        }

    }, [])


    if (exisitingCategories === undefined && existingBrands === undefined)
        return (
            <Loader />
        )
    else
        return (

            <>
                <Menu
                    trigger="hover"
                    delay={0}
                    transitionDuration={0}
                    placement="end"
                    gutter={1}
					className="w-50"
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
                                    <span className={classes.linkLabel}>By Category</span>
                                    <ChevronDown size={12} />
                                </Center>
                            </a>
                        }
                    >
                        {exisitingCategories?.map((x) => {
                            return <Menu.Item component={Link} to="/newbrand" key={x.id}> {x.name}</Menu.Item>
                        })}

                    </Menu>


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
                                    <span className={classes.linkLabel}>By Brand</span>
                                    <ChevronDown size={12} />
                                </Center>
                            </a>
                        }
                    >
                        {existingBrands?.map((x) => {
                            return <Menu.Item component={Link} to="/newbrand" key={x.id}> {x.name}</Menu.Item>
                        })}


                    </Menu>

                </Menu>

            </>
        )
}

