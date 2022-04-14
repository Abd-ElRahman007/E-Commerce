import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import * as api from '../../helpers/api'


import { Loader, Container, SimpleGrid } from '@mantine/core';

import ProductThumb from '../ProductThumb';

export default function Browse() {


  const { id } = useParams()
  const location = useLocation()
  const type = location.state.type
  console.log("typeeeeeeeee", type)

  const [products, setProducts] = useState()

  console.log("products  ---->", products)

  async function getProductsByCategory(id) {
    const productsData = await api.getProductsByCategory(id)
    setProducts(productsData)
  }

  async function getProductsByBrand(id) {
    const productsData = await api.getProductsByBrand(id)
    setProducts(productsData)
  }


  useEffect(() => {
    if (type === "category") { getProductsByCategory(id) }
    else if(type === "brand")
        { getProductsByBrand(id) }
  }, [id, type])


  if (products === undefined)
    return <Loader />
  else
    return (
      <Container>
        <SimpleGrid cols={3} spacing="lg"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]} >

          {products.map((item) => {
            return <ProductThumb product={item}
              key={item.id}
              type="thumb"
            />
          })
          }
        </SimpleGrid>
      </Container>
    )
}
