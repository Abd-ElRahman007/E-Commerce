import { Name, Price, Description } from "./productOverviewComponents/componentExport"
import { useSelector } from "react-redux"
import { HashLink } from 'react-router-hash-link';
import {Container, Grid, SimpleGrid } from '@mantine/core';
import Rating from '@mui/material/Rating';
import { authState } from "../redux/slices/authSlice"

export default function Overview(props){
	const user = useSelector(authState)
	
return(
<>
                    <Grid.Col>
                      <Name name={[props.p.name, ' ', props.p.model]} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Price price={props.p.price} currency={props.p.currency} />
                    </Grid.Col>
                    <Grid.Col span={6}>
				<HashLink smooth to={user.id === null
						? '/login'
						: '/cart'   /* product view feedback section  */
						}
					>
                <Rating name="read-only"
                  size="large"
				  style={{margin:'auto'}}
                  value={props.p.vote_total || props.p.vote_count == 0
                    ? 0
                    : props.p.vote_total / props.p.vote_count
                  }
                  readOnly={user.id === null
                    ? true
                    : false
                  }
                />
              </HashLink>                     
                    </Grid.Col>
                
              
                
				</>
)}
