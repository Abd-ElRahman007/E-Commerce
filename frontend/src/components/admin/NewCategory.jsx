import React from 'react'
import styled from 'styled-components';

const NewCategory = () => {
    return (
        <Form>
            <Input type="text" />
            <SubmitButton type="submit" value="submit" />
        </Form>
    )
}

const Form = styled.form`
    height: 100vh; 
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Input = styled.input`
    border: none;
        outline-style: none;
        width: 600px;
        height: 60px;
        font-size: 25px;
        background-color: #adadad;
        border-radius: 5px;
`

const SubmitButton = styled.input`
        margin-top: 3rem;
        padding: 1rem 2rem;
        font-size: 1rem;
        color: #fff;
        border-radius: 7px;
        border: none;
        background: green;
        cursor: pointer;
        &:hover{
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        }
`


export default NewCategory;