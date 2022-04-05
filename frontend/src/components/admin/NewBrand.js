import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';

import axios from 'axios';

export default function NewBrand() {
    const [nameInput, setNameInput] = useState('');
    const [descInput, setDescInput] = useState('')

   
        const handelSubmit = (e)=> {
            e.preventDefault(e)
            console.log("brand name  to be added " , nameInput)
            console.log("brande desc to be added " , descInput)

            axios.post('http://localhost:5000/brands', { name: nameInput , 
                                                         description : descInput })
             .then(response => console.log("backend response" , response))
             .catch(error =>console.log("backend error" , error))
        }

    return (
        <form onSubmit={handelSubmit}>
        <TextInput required
                   label='name'
                   placeholder='enter name'
                   value={nameInput}
                   onChange={(event) => setNameInput(event.currentTarget.value)}      
            />

            <Textarea
                label='description'
                placeholder='enter description'
                required
                value={descInput}
                onChange={(event)=>setDescInput(event.currentTarget.value)}
                autosize
                minRows={3}
                mt="md"
                style={{ width: '100%' }}
                />
            <button   type="submit">
                add new brand
            </button>
            </form>
    )
}