import { Container, Grid, SimpleGrid } from '@mantine/core';
// import { Image, Name, Rating, Price, Description } from './productOverviewComponents/componentExport';
import {useState, useEffect}from 'react';
import * as api from '../helpers/api';
import {useParams}from 'react-router-dom';
import ProductThumb from "./ProductThumb";
import {Loader} from '@mantine/core'





export default function ProductOverview() {
const [dataProduct, setDataProduct] = useState();

	const {id}=useParams();
	
	async function getProduct(id){
const data = await api.getProductOverview(id);
        setDataProduct(data);	
}

useEffect(() => {
		getProduct(id);
	}, [])


    if (dataProduct===undefined)
     return <Loader/>
     else 
    return (
                 <ProductThumb product={dataProduct}
                                type ="overview"/>
       /*  <Container my="md">
        <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <ImageOverview dim={{width:"300px"}}
                            image={dataProduct.image}
                            title={dataProduct.name}
                />
                <Grid gutter="md">
                <Grid.Col>
                    <Name name={[dataProduct.name,' ',dataProduct.model]} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Price price={dataProduct.price} currency={dataProduct.currency} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Rating data={{
                        label: 'Rating',
                        stats: [dataProduct.vote_total,' / 10'],
                        color: 'green',
                        icon: 'up',
                        progress: dataProduct.vote_total / dataProduct.vote_count * 100
                    }} />
                </Grid.Col>
            </Grid>
        </SimpleGrid>
        <Description description={dataProduct.description} label="Description" />
    </Container>  */
       
    );
}


 /*
    <ProductThumb product={dataProduct}/>
 */