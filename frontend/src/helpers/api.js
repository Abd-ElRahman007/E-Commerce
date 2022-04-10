import axios from "axios"


export const getCategories = async() => {

 const data = await axios.get('http://localhost:5000/categories',)
        return data.data
}

export const getBrands =async () => {
    const data = await axios.get('http://localhost:5000/brands',)
         return data.data
}


export const getProductsLimited =async (limit) => {
    const data = await axios.get(`http://localhost:5000/products?page=1&limit=${limit}`,)
         return data.data.data
}
/* 
export const getBrands =async () => {

    const data=   await  axios.get('http://localhost:5000/brands',)
        .then((response) => {
            return response.data
        })
        .catch(error => console.log("backend error brands", error))
} */