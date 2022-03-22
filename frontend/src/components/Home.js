import React from 'react'
import { Loader } from '@mantine/core';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {

    const [state, setState] = useState([])
    const [loading , SetLoading] = useState(false)
    useEffect(() => {
        axios.get("/api/persons")
        .then ((res=>{
            console.log(res.data)
            setState(res.data)
            SetLoading(true)

        }))
        
        
      },[])
    if (loading=== false)
        return ( 
              <Loader/>
             
    )
     else 
      return (
        <div>
           {
               state.map((x)=>{

                return <p   key={x.id}>
                         {x.name}
                       </p>
               })
           }
           
        </div>
    )
}
