import { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Grid, Skeleton, Container } from '@mantine/core';
import ProductThumb from "./ProductThumb";
import TempCart from "./TempCart";

//const child = <Skeleton height={222} radius="md" animate={false} />;

export default function Home() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([])
    const [loading, SetLoading] = useState(false);

    function update() {
        axios.get("http://localhost:3001/categories")
            .then((res) => {
                console.log(res.data);
                setCategory(res.data);
            });
        axios.get("http://localhost:3001/products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            });
        SetLoading(true);
    }

    useEffect(() => {
        update()

        return () => {
            setCategory([]);
            setProducts([]);
        };
    }, [loading]);

    if (loading === false) return <Loader />;
    else
        return (
            <Container my="md">
                <TempCart/>
                {category.map((x) => (
                    <div key={x.id}>
                        <p>{x.name}</p>
                        <Grid columns={3} gutter="lg" >
                            {products.filter((item) => item.category === x.name)
                                .slice(0, 6).map((p) => {
                                    return <Grid.Col xs={1} key={p.id}>
                                                <ProductThumb  product={p}/>
                                           </Grid.Col>
                                })}
                        </Grid>
                    </div>
                ))}
            </Container>
        );
}
