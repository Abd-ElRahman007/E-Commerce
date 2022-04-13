import {
    Menu,
    Center,
    Loader,
} from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

    useEffect(() => {
        getCategories()
        console.log("categories in backend ", existingCategories)
        getBrands()
        console.log("brands in backend ", existingBrands)
        return () => {
            setExistingCategories()
            setExistingBrands()
        }
    })

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
                        <a className={classes.link}> hello {/* a tag require a href attribute */}
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
                        <a className={classes.link}> {/* a tag require a href attribute */}
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
