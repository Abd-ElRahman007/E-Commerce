import { Text } from '@mantine/core';
import { authState } from "../../redux/slices/authSlice"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import UserMenu from '../UserMenu';


export default function UserDisplay() {
    const userState = useSelector(authState)
    const { id } = userState
    if (id)
        return (
            <UserMenu />
        )
    else
        return (
            <Text size="sm" component={Link} to="/login" >
                Login/Sign up

            </Text>

        )
}
