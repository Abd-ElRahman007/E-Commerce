import { useState, useEffect } from 'react';
import * as api from '../helpers/api';
import { useParams } from 'react-router-dom';
import ProductThumb from "./ProductThumb";
import { Loader } from '@mantine/core'

export default function ProductOverview() {
    const [dataProduct, setDataProduct] = useState();
    const { id } = useParams();

    async function getProduct(id) {
        const data = await api.getProductOverview(id);
        setDataProduct(data);
    }

    useEffect(() => {
        getProduct(id);
    }, []) //React Hook useEffect has a missing dependency: 'id'. Either include it or remove the dependency array


    if (dataProduct === undefined)
        return <Loader />
    else
        return (
            <ProductThumb product={dataProduct}
                type="overview" />
        );
}
