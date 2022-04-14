import { Autocomplete , Group , Avatar , Text ,Loader } from '@mantine/core';
import * as api from "../helpers/api"
import { useNavigate } from "react-router-dom";
import React , { forwardRef }  from 'react'
import { useState , useEffect , useRef} from 'react';

export default function SearchNav(props) {

    const [products, setProducts] = useState([])

    const query = useRef(null);
    const navigate=useNavigate()


 
    const Search = async (q)=>{
        if (q === " " ||  q === undefined || q ===null)
              {setProducts([])}
          else 
            { const SearchedProducts = await api.searchProducts(q)               
                setProducts(SearchedProducts)}                                 
             }


    const SearchedProducts =()=>{   

        let results=[]

        products?.forEach( (x)=>{
               results.push( { value :x.name ,
                               id : x.id ,
                               image :x.image,
                               price :x.price })             
          })      
       return results

    }
    useEffect(() => {
      if (query.current.value === "" ||  query.current.value ===  undefined || query.current.value === null)
      setProducts([]) 
      else
      Search(query.current.value)
      
        return () => {
          setProducts([])             
        };
        }, [query]);

    return (  <>
                <Autocomplete 
                            transition="pop-top-left"
                            transitionDuration={80}
                            transitionTimingFunction="ease"
                            radius="lg"
                            limit={10}
                            className={[props.classes.search, "w-100"]}
                            placeholder="Search"
                          
                            data={SearchedProducts()}
                            ref={query}
                            itemComponent={forwardRef(({value, id, image,price,...others}, query) => {
                                
                              return (
                                <div {...others}  ref={query}>                     
                                                         
                                <Group noWrap> 
                                    <Avatar src={image} /> 
                         
                                    <div>
                                       <Text>{value}</Text>
                                       <Text size="xs" color="dimmed">
                                         {price}
                                       </Text>
                                     </div> 
                                   </Group>                        
                                  
                             </div>   
                              )
                            })}
                            onChange={() => {Search(query.current.value)                    
                             }}
              
              
                             onItemSubmit={(item) => 
                                navigate(`/ProductOverview/${item.id}`)  
                              }
                />
                </>
    )
}
