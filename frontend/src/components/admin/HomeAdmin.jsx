import React from 'react'
import styled from 'styled-components';

const HomeAdmin = () => {
    return (
    <Grid>
        {/* {cuisine.map((item) => {
            return(
                <Card key={item.id}>
                    <h1></h1>
                </Card>
            );
        })} */}
        <Card>
            <h1>hi</h1>
        </Card>
        <Card>
            <h1>hi</h1>
        </Card>
        <Card>
            <h1>hi</h1>
        </Card>
        <Card>
            <h1>hi</h1>
        </Card>
        <Card>
            <h1>hi</h1>
        </Card>
        <Card>
            <h1>hi</h1>
        </Card>

    </Grid>
    );
}


const Grid = styled.div`
    height: 100vh;
    display: grid;
  justify-content: center;
  align-content: center;
  gap: 30px;
  grid-auto-flow: column;
  grid-template-rows: repeat(2, 23rem);

`;
const Card = styled.div`
    border-radius: 25px;
    width: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
    height: 23rem;
    h1{
        text-align: center;
        padding: 1rem;

    }
`;


export default HomeAdmin;