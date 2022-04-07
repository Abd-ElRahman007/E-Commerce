import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import jwt from 'jsonwebtoken';

const token = JSON.parse(localStorage.getItem('userToken'))
//const userData = parseJwt(token)


const initialState = {

  

    id :null,
    first_name : "",
    last_name : "",
     status : "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
  
}

export const login = createAsyncThunk(
  "auth/login",
  async (userInput, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", userInput)
      console.log('response login', response);
      if (response.data) {
        localStorage.setItem('userToken', JSON.stringify(response.data.token))
      }
      return response.data.result
    } catch (error) {
      const message = 
       (error.response && 
        error.response.data &&
        error.response.data.message)
        || error.message||
        error.toString()
      return thunkAPI.rejectWithValue(message);
    }
  }
)


export const register = createAsyncThunk(
  "auth/register",
  async (userInput, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/users", userInput)
      console.log('response register', response);
      if (response.data) {
        localStorage.setItem('userToken', JSON.stringify(response.data.token))
      }
      return response.data.result
    } catch (error) {
      const message = 
       (error.response && 
        error.response.data &&
        error.response.data.message)
        || error.message||
        error.toString()
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const authSlice = createSlice({

  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    }


  },
  extraReducers: (builder)=> {
    builder 
    // login cases
     .addCase(login.pending, (state)=>{
      state.isLoading = true
     })
     .addCase(login.fulfilled , (state,action)=>{
      state.isLoading = false
      state.isSuccess = true
      state.id = action.payload.id
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.status = action.payload.status
     })
     .addCase(login.rejected , (state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.id = null
      state.first_name = ""
      state.last_name =  ""
      state.status = ""
     })
       // register cases 
     .addCase(register.pending, (state)=>{
      state.isLoading = true
     })
     .addCase(register.fulfilled , (state,action)=>{
      state.isLoading = false
      state.isSuccess = true
      state.id = action.payload.id
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.status = action.payload.status
     })
     .addCase(register.rejected , (state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.id = null
      state.first_name = ""
      state.last_name =  ""
      state.status = ""
     })
  }




})



export const { reset } = authSlice.actions

export default authSlice.reducer

export const authState = state => state.auth