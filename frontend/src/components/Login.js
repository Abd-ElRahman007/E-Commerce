import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor
} from '@mantine/core';
import { useEffect } from "react";
import { AlertCircle } from 'tabler-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { authState, login, register, reset } from '../redux/slices/authSlice';
import { showNotification } from '@mantine/notifications';

export function Login(props) {
  const [type, toggle] = useToggle('login', ['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      terms: true,
    },
    validationRules: {
      /*  email: (val) => /^\S+@\S+$/.test(val), */
      password: (val) => val.length >= 1,
    },
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const clearInput = () => {
    form.setFieldValue('email', "")
    form.setFieldValue('first_name', "")
    form.setFieldValue('last_name', "")
    form.setFieldValue('password', "")
  }

  const handleError = () => {
    showNotification({
      title: "Error ",
      message: "Wrong email or password ",
      color: 'red',
      icon: <AlertCircle />,


    })
  }

  const userState = useSelector(authState)

  const { isError, isSuccess, status } = userState


  const handelSubmit = () => {

    console.log("form", form.values)
    if (type === "login") {
      const { email, password } = form.values
      const userInfo = {
        email: email,
        password: password
      }
      dispatch(login(userInfo))
    }
    else if (type === "register") {
      const { email, password, first_name, last_name } = form.values
      const userInfo = {
        f_name: first_name,
        l_name: last_name,
        email: email,
        password: password
      }
      dispatch(register(userInfo))
      clearInput()
      console.log("userInfo", userInfo)
    }
  }

  useEffect(() => {
    if (isError) {
      handleError()
    }
    if (isSuccess && status === "admin") {
      navigate("/")
    }
    if (isSuccess && status !== "admin") {
      navigate("/")
    }

    dispatch(reset())

  }, [isError, isSuccess]) //React Hook useEffect has missing dependencies: 'dispatch', 'navigate', and 'status'. Either include them or remove the dependency array

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, {type} with
      </Text>
      <Divider label="Or continue with email" labelPosition="center" my="lg" />
      <form onSubmit={form.onSubmit(handelSubmit)}>
        <Group direction="column" grow>
          {type === 'register' && (
            <>
              <TextInput
                label="First Name"
                placeholder="Your first name"
                value={form.values.first_name}
                onChange={(event) => form.setFieldValue('first_name', event.currentTarget.value)}
              />
              <TextInput
                label="Last Name"
                placeholder="Your last name"
                value={form.values.last_name}
                onChange={(event) => form.setFieldValue('last_name', event.currentTarget.value)}
              />
            </>
          )}
          <TextInput
            required
            label="Email"
            placeholder="Your email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />
          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Group>
        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}
