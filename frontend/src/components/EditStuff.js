import { useState } from 'react';
import { TextInput } from '@mantine/core';
import axios from 'axios';

export default function NewCategory() {
    const [input, setInput] = useState('');
   
        const handelSubmit = (e)=> {
            e.preventDefault(e)
            console.log("category to be added " , input)
            axios.put('http://localhost:5000/products/9', { image: input })
             .then(response => console.log("backend response" , response))
             .catch(error =>console.log("backend error" , error))
        }
    /* function handelSubmit(e) {    looks the same but didnt work !!
        e.preventDefault(e)
        console.log("value to be added " , value)
        axios.post('http://localhost:5000/categories', { name: value })
             .then(response => console.log("backend response" , response))
             .catch(error =>console.log("backend error" , error))
    } */

    return (
        <form onSubmit={handelSubmit}>
        <TextInput required
                   label='name'
                   placeholder='enter name'
                   value={input}
                   onChange={(event) => setInput(event.currentTarget.value)}      
            />

            <button   type="submit">
               edit 
            </button>
            </form>
    )
}