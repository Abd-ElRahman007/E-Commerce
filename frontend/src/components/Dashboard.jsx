import React from 'react';
import { createStyles, TextInput, Group, Button, NumberInput,Loader } from '@mantine/core';
import { At, Phone, MapPin, Map2 } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import { useState,useEffect } from 'react';
import { DatePicker } from '@mantine/dates'
import { useParams } from 'react-router-dom';
import * as api from '../helpers/api';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
	input: {
		backgroundColor: theme.white,
		borderColor: theme.colors.gray[4],
		color: theme.black,

		'&::placeholder': {
			color: theme.colors.gray[5],
		},
	},

	label: {
		color: theme.black
	},
}));

export default function Dashboard() {
	// You can add these classes as classNames to any Mantine input, it will work the same
	const { classes } = useStyles();
	const [enable, setEnable] = useState(true);
	const [button, setButton] = useState('Edit');
	const [dataUser, setDataUser] = useState();
    const { id } = useParams();

async function getUser(id) {
        const data = await api.getUser(id);
        setDataUser(data);
		putData(data)
    }
function putData(data){
	form.setFieldValue('f_name',data.f_name)
		form.setFieldValue('l_name',data.l_name)
		form.setFieldValue('email',data.email)
		form.setFieldValue('phone',data.phone)
		form.setFieldValue('birthday',data.birthday)
		form.setFieldValue('address',data.address)
		form.setFieldValue('city',data.city)
}
    useEffect(() => {
        getUser(id);
    }, [])

	const form = useForm({
		initialValues: {
			f_name: '',
			l_name: '',
			email: '',
			birthday: 0,
			phone: '',
			address: '',
			city: '',
		}
	})

	function toISOLocal(d) {
		if (d) {
			return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString();
		}
	}
	
	async function handleSubmit(){
		const token = JSON.parse(localStorage.getItem('userToken'));
		axios.patch(`http://localhost:5000/users/${id}`, form.values,{headers:{token:token}})
			.then((response) => {
				console.log(response)
			})
			.catch(function (error) { console.log(error) })

	}

if(dataUser===undefined){
	return(
	<Loader/>
	)
}else{
	return (
		<form onSubmit={form.onSubmit(() => handleSubmit())}>
			<TextInput
				disabled={enable}
				label="First Name"
				placeholder="First Name"
				value={form.values.f_name}
				onChange={(event) => form.setFieldValue('f_name', event.currentTarget.value)}
				classNames={classes}
				required
			/>

			<TextInput
				label="Last Name"
				placeholder="Last Name"
				disabled={enable}
				value={form.values.l_name}
				onChange={(event) => form.setFieldValue('l_name', event.currentTarget.value)}
				classNames={classes}
				required
			/>

			<TextInput
				label="Email"
				disabled={enable}
				placeholder="Email"
				value={form.values.email}
				onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
				icon={<At size={14} />}
				required
				classNames={classes}
			/>

			<DatePicker
				placeholder="Pick Birthday"
				label="Birthday"
				disabled={enable}
				value={form.values.birthday}
				onChange={(val) => form.setFieldValue('birthday', toISOLocal(val))}
				required
			/>

			<NumberInput
				hideControls
				disabled={enable}
				label="Phone Number"
				placeholder="Phone Number"
				required
				value={form.values.phone}
				onChange={(val) => form.setFieldValue('phone', val)}
				icon={<Phone size={14} />}
				classNames={classes}
			/>

			<TextInput
				label="Address"
				disabled={enable}
				placeholder="Address"
				icon={<MapPin size={14} />}
				value={form.values.address}
				onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
				required
				classNames={classes}
			/>

			<TextInput
				label="City"
				disabled={enable}
				placeholder="City"
				icon={<Map2 size={14} />}
				value={form.values.city}
				onChange={(event) => form.setFieldValue('city', event.currentTarget.value)}
				required
				classNames={classes}
			/>

			<Group
				position="right"
				mt="md">
				<Button onClick={() => {
					if (enable) {
						setEnable(false)
						setButton('Close Edit')
					} else {
						setEnable(true)
						setButton('Edit')
					}
				}
				}>{button}</Button>
				<Button disabled={enable} type="submit">Submit</Button>

			</Group>
		</form>
)};
}
