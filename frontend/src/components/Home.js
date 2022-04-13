import { useState, useEffect } from "react";
import { Loader, Container, SimpleGrid, Text } from '@mantine/core';
import ProductThumb from "./ProductThumb";
import * as api from "../helpers/api";

export default function Home() {
    const [products, setProducts] = useState();
    const [category, setCategory] = useState()
    const [loading, SetLoading] = useState(false);
    const [type, setType] = useState("")
    const update = async () => {
        await api.getCategories()
            .then((res) => {
                console.log("ccccccccccc ", res);
                setCategory(res);
            });
        // const limit= category?.length *6
        await api.getProductsLimited(22)
            .then((res) => {
                console.log("pppppppppp ", res);
                setProducts(res);
            });
        SetLoading(true);
    }

    useEffect(() => {
        setType("thumb")
        update()
        return () => {
            setCategory();
            setProducts();
        };
    }, [loading]);

    if (category === undefined || products === undefined) return <Loader />;
    else
        return (
            <Container my="md">
                {category?.map((x) => (
                    <div key={x.id}>
                        <Text
                            component="span"
                            align="center"
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                            size="xl"
                            weight={700}
                            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                        >
                            {x.name}
                        </Text>
                        <SimpleGrid cols={3} spacing="lg"
                            breakpoints={[
                                { maxWidth: 980, cols: 3, spacing: 'md' },
                                { maxWidth: 755, cols: 2, spacing: 'sm' },
                                { maxWidth: 600, cols: 1, spacing: 'sm' },
                            ]} >
                            {products?.filter((item) => item.category_id === x.id.toString())
                                .slice(0, 6).map((p, index) => {
                                    return <ProductThumb product={p}
                                        key={p.id}
                                        type={type} />
                                })}
                        </SimpleGrid>
                    </div>
                ))}
                <div id="section1">
                    are u here yet !!!
                </div>
            </Container>
        );
}
