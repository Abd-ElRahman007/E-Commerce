import { useState } from 'react';
import { TextInput } from '@mantine/core';
import axios from 'axios';

export default function NewCategory() {
    const [nameInput, setNameInput] = useState('');
   
        const handelSubmit = (e)=> {
            e.preventDefault(e)
            console.log("category to be added " , nameInput)
            axios.post('http://localhost:5000/categories', { name: nameInput })
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
                   value={nameInput}
                   onChange={(event) => setNameInput(event.currentTarget.value)}      
            />

            <button   type="submit">
                add new category
            </button>
            </form>
    )
}
