import axios from "axios"

export const getCategories = async () => {

    const data = await axios.get('/categories')
    return data.data
}

export const getBrands = async () => {
    const data = await axios.get('/brands')
    return data.data
}
export const getProductOverview = async (id) => {
    const data = await axios.get(`http://localhost:5000/products/${id}`)
    return data.data
}
export const getUser=async(id)=>{
	const token = JSON.parse(localStorage.getItem('userToken'))
	const data=await axios.get(`http://localhost:5000/users/${id}`,'',{headers:{token:token}});
	return data.data
}

export const getProductsLimited = async (limit) => {
    const data = await axios.get(`/products?page=1&limit=${limit}`)
    return data.data.data
}

export const getProductsByCategory = async (id) => {
    const data = await axios.get(`/products?category=${id}`)
    return data.data
}

export const getProductsByBrand = async (id) => {
    const data = await axios.get(`/products?brand=${id}`) 
    return data.data
}

export const searchProducts= async (q) => {
    const data = await axios.get(`/products?name=${q}`) 
    console.log ("query search ", data )
    return data.data
}
