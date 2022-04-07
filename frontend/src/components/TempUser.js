
import { useSelector } from "react-redux"
import { authState } from "../redux/slices/authSlice"


export default function TempUser() {

    const {id,first_name,last_name,status,message}=useSelector(authState)
    return (
        <div>
            <h3>user</h3>
            <h5>id : {id}</h5>
            <h5>first name : {first_name}</h5>
            <h5>last name : {last_name}</h5>
            <h5>status : {status}</h5>
            <h5>message : {message}</h5>
           
        </div>
    )
}
