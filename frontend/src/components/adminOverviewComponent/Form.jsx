import { useForm } from '@mantine/form';
import InputCurrency from './InputCurrency';
import InputDropdown from './InputDropdown';
import InputStoke from './InputStoke';
import InputText from './InputText';
import InputTextArea from './InputTextArea';
import { Group, Button } from '@mantine/core';
import { useState } from 'react';

export default function Form() {
	const [dataName, setProductName] = useState('');
	const [dataCode, setProductCode] = useState('');
	const [dataModel, setProductModel] = useState('');
	const [dataCategory, setCategory] = useState('');
	const [dataBrand, setBrand] = useState('');
	const [dataCurrency, setCurrency] = useState('');
	const [dataPrice, setPrice] = useState('');
	const [dataStoke, setStoke] = useState(1);
	const [dataDescription, setDescrition] = useState('');

	const form = useForm({
		initialValues: {
			name: '',
			model: '',
			code: '',
			stock: '',
			category: '',
			brand: '',
			price: '',
			currency: 'egp',
			description: ''
		}
	})
	function name(childData) {
		setProductName(childData);
		form.setFieldValue('name', childData)
	}
	function code(childData) {
		setProductCode(childData);
		form.setFieldValue('code', childData)
	}
	function model(childData) {
		setProductModel(childData);
		form.setFieldValue('model', childData)
	}
	function category(childData) {
		setCategory(childData);
		form.setFieldValue('category', childData)
	}
	function brand(childData) {
		setBrand(childData);
		form.setFieldValue('brand', childData)
	}
	function price(childData) {
		setPrice(childData);
		form.setFieldValue('price', childData)
	}
	function currency(childData) {
		setCurrency(childData);
		form.setFieldValue('currency', childData)
	}
	function stoke(childData) {
		setStoke(childData);
		form.setFieldValue('stock', childData)
	}
	function description(childData) {
		setDescrition(childData);
		form.setFieldValue('description', childData)
	}

	return (
		<form onSubmit={form.onSubmit((values) => axion({method:'post',url:'http://localhost:5000/products',data:values}).then(function(response){console.log(response)}).catch(function(error){console.log(error)}))}>
			<InputText toParent={name} data={{ label: 'Product Name', placeholder: 'Product Name', value: dataName }} radius='md' />
			<InputText toParent={code} data={{ label: 'Product Code', placeholder: 'Product Code', value: dataCode }} radius='md' />
			<InputText toParent={model} data={{ label: 'Product Model', placeholder: 'Product Model', value: dataModel }} radius='md' />
			<InputDropdown toParent={category} data={{ label: 'Category', placeholder: 'category', data: ['category1', 'category2', 'category3', 'category4', 'category5'], value: dataCategory }} />
			<InputDropdown toParent={brand} data={{ label: 'Brand', placeholder: 'Brand', data: ['brand1', 'brand2', 'brand3', 'brand4', 'brand5'], value: dataBrand }} />
			<InputCurrency toParent={price} toParentTwo={currency} dataInput={{ value: dataPrice }} currency={dataCurrency} />
			<InputStoke toParent={stoke} value={dataStoke} max='' />
			<InputTextArea toParent={description} data={{ label: 'Description', placeholder: 'description', value: dataDescription }} />
			<Group position="right" mt="md">
				<Button type="submit">Submit</Button>
			</Group>
		</form>
	)
}
