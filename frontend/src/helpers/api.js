import axios from "axios"

export const getCategories = async () => {

    const data = await axios.get('http://localhost:5000/categories',)
    return data.data
}

export const getBrands = async () => {
    const data = await axios.get('http://localhost:5000/brands',)
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
    const data = await axios.get(`http://localhost:5000/products?page=1&limit=${limit}`,)
    return data.data.data
}

export const getProductsByCategory = async (id) => {
    const data = await axios.get(`http://localhost:5000/products?category=${id}`,)
    return data.data
}

export const getProductsByBrand = async (id) => {
    const data = await axios.get(`http://localhost:5000/products?brand=${id}`,) // to be written
    return data.data
}
