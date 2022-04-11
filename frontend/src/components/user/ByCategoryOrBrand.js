import { useState , useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import * as api from '../../helpers/api'


import {
    Card, Image, Text, Badge, Button, Group, useMantineTheme,
    ActionIcon, ColorSchemeProvider , Loader, Grid, Skeleton, Container , SimpleGrid
  } from '@mantine/core';

import ProductThumb from '../ProductThumb';

export default function ByCategoryOrBrand() {


const{id}=useParams()

const [products, setProducts] = useState()
async function getProducts (id){  
    const productsData= await api.getProductsByCategory(id)
    setProducts(productsData)
//   console.log("productsData  ---->", productsData )
        }

useEffect(() => {
    getProducts(id)
   /*  return () => {
        cleanup
    } */
}, [])


    if (products=== undefined)
      return <Loader/>
     else
       return (
          <Container>
        

                    <SimpleGrid cols={3} spacing="lg"
                        breakpoints={[
                            { maxWidth: 980, cols: 3, spacing: 'md' },
                            { maxWidth: 755, cols: 2, spacing: 'sm' },
                            { maxWidth: 600, cols: 1, spacing: 'sm' },
                        ]} >
                            
                        {products.map((item) => (

                            <ProductThumb product={item} key={item.id} />
                        ))

                        }


                    </SimpleGrid>


</Container>
    )
}
