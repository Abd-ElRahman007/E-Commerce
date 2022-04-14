import { ChevronRight, Dashboard, ShoppingCart, Logout } from 'tabler-icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom'
import { authState, logout } from "../redux/slices/authSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"


const UserButton = forwardRef(
  ({ image, firstname,lastname, email, icon, ...others }, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        width: '100%',
        padding: theme.spacing.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group style={{ width: '100%', gap: '10px' }}>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {firstname} {lastname}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
        {icon || <ChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

export default function UserMenu({ name, email }) {
  const dispatch = useDispatch()
  const user = useSelector(authState)
  return (
    <Group position="center">
      <Menu
        withArrow
        placement="center"
        control={
          <UserButton
            firstname={user.f_name}
			lastname={user.l_name}
            email={user.email}
          />
        }
      >
        <Menu.Item
          component={Link} to={"/AdminDashboard/"+ user.id}
          icon={<Dashboard size={19} />}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          component={Link} to="/order"
          icon={<ShoppingCart size={19} />}
        >
          Orders
        </Menu.Item>

        <Menu.Item
          color="red"
          as="button" onClick={() => dispatch(logout())}
          icon={<Logout size={19} />}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Group>
  );
}
