import axios from "axios"


export const getCategories = async() => {

 const data = await axios.get('/categories',)
        return data.data
}

export const getBrands =async () => {
    const data = await axios.get('/brands',)
         return data.data
}


export const getProductsLimited =async (limit) => {
    const data = await axios.get(`/products?page=1&limit=${limit}`,)
         return data.data.data
}

export const getProductsByCategory =async (id) => {
    const data = await axios.get(`/${id}/products`,)
         return data.data.data
}
