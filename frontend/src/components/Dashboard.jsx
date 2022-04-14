import React from 'react';
import { createStyles, TextInput, Group, Button, NumberInput } from '@mantine/core';
import { At, Phone, MapPin, Map2 } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { DatePicker } from '@mantine/dates'


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

	const form = useForm({
		initialValues: {
			f_name: '',
			l_name: '',
			email: '',
			birthday: 0,
			phone: '',
			address: '',
			city: ''
		}
	})

	function toISOLocal(d) {
		if (d) {
			return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString();
		}
	}


	return (
		<form onSubmit={form.onSubmit(() => console.log(form.values))}>
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
				<Button type="submit">Submit</Button>

			</Group>
		</form>
	);
}
