
import { useSelector } from "react-redux"
import { authState, logout } from "../redux/slices/authSlice"
import { useDispatch } from "react-redux"


export default function TempUser() {
    const dispatch = useDispatch()

    const {id,first_name,last_name,status,message}=useSelector(authState)
    return (
        <div>
            <h3>user</h3>
            <h5>id : {id}</h5>
            <h5>first name : {first_name}</h5>
            <h5>last name : {last_name}</h5>
            <h5>status : {status}</h5>
            <h5>message : {message}</h5>
            
            <button onClick={()=>dispatch(logout())}>logout</button>
           
        </div>
    )
}
