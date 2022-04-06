import { useForm } from '@mantine/form';
import InputCurrency from './InputCurrency';
import InputDropdown from './InputDropdown';
import InputStoke from './InputStoke';
import InputText from './InputText';
import InputTextArea from './InputTextArea';
import { Group, Button , Autocomplete, Text } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import React, { forwardRef } from 'react'



export default function Form() {
	const [dataName, setProductName] = useState('');
	const [dataCode, setProductCode] = useState('');
	const [dataModel, setProductModel] = useState('');
	const [dataCategory, setCategory] = useState('');
	const [dataBrand, setBrand] = useState('');
	const [dataCurrency, setCurrency] = useState('');
	const [dataPrice, setPrice] = useState(0);
	const [dataStoke, setStoke] = useState(1);
	const [dataDescription, setDescrition] = useState('');
	const [imageData, setImageData] = useState('')

	const [exisitingCategories, setExisitingCategories] = useState([])
	const [existingBrands, setExistingBrands] = useState([])

	const form = useForm({
		initialValues: {
			name: '',
			model: '',
			code: '',
			stock: '',
			category_id: '',
			brand_id: '',
			price: '',
			currency: 'egp',
			description: '',
			vote_count: 0,
			vote_total: 0,
		}
	})


	console.log("form", form.values)

//	console.log("dataCategory", dataCategory)


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
		console.log("childData", childData)
		setCategory(childData);
		form.setFieldValue('category_id', childData)
	}
	function brand(childData) {
		setBrand(childData);
		form.setFieldValue('brand_id', childData)
	}
	function price(childData) {
		setPrice(childData);
		form.setFieldValue('price', Number(childData))
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
	function image(childData) {
		setImageData(childData);
		form.setFieldValue('image', childData)
	}

	const getCategories = () => {

		axios.get('http://localhost:5000/categories',)
			.then((response) => {
				console.log("backend response categoies", response)
				setExisitingCategories(response.data)
			})
			.catch(error => console.log("backend error categoies", error))
	}

	const getBrands = () => {

		axios.get('http://localhost:5000/brands',)
			.then((response) => {
				console.log("backend response brands", response)
				setExistingBrands(response.data)
			})
			.catch(error => console.log("backend error brands", error))
	}


	const query = useRef(null);

	const categoryData = () => {
		let results = []

		exisitingCategories?.map((c) => {
			return results.push({ value: c.name, id: c.id })
		})
		return results

	}

	const brandData = () => {
		let results = []

		existingBrands.map((c) => {
			return results.push({ value: c.name, id: c.id })
		})
		return results

	}
	
const clearInput = () => {
	 setProductName('')
	 setProductCode('')
	 setProductModel('');
	 setCategory('');
	 setBrand('');
	 setCurrency('');
	 setPrice(0);
	 setStoke(1);
	 setDescrition('');
	 setImageData('')
    }

	const handelSubmit = (values) => {
		//e.preventDefault(e)
		console.log("values to send", values)
		axios.post('http://localhost:5000/products', values)
			.then((response) => {
				console.log("backend response brands", response)
				clearInput()
			}).
			catch(function (error) { console.log(error) })
	}

	useEffect(() => {
		getCategories()
		console.log("categoies in backend ", exisitingCategories)

		getBrands()
		console.log("brands in backend ", existingBrands)


		/* return () => {

			cleanup     
		}
 */
	}, [])


	

	return (
		<form onSubmit={form.onSubmit(handelSubmit)}>
			<InputText toParent={name} data={{ label: 'Product Name', placeholder: 'Product Name', value: dataName }} radius='md' />
			<InputText toParent={code} data={{ label: 'Product Code', placeholder: 'Product Code', value: dataCode }} radius='md' />
			<InputText toParent={model} data={{ label: 'Product Model', placeholder: 'Product Model', value: dataModel }} radius='md' />


			{/* <InputDropdown toParent={category} info={{ 
												label: 'Category',
												placeholder: 'category',
												data: backendCategoriesnames(),
												value: dataCategory }} 
							  />
 */}


			<Autocomplete transition="pop-top-left"
				transitionDuration={80}
				transitionTimingFunction="ease"
				size="lg"
				limit={10}
				placeholder="Enter Category "
				data={categoryData()}
				ref={query}
				itemComponent={forwardRef(({ id, value, ...others }, query) => {
					return (
						<div {...others} ref={query}>
							<Text>{value}</Text>
						</div>
					)
				})}
				onItemSubmit={(item) =>
					form.setFieldValue('category_id', item.id)
				}


			/>

			{/* 			<InputDropdown toParent={brand} info={{ label: 'Brand', placeholder: 'Brand', data:backendBrands(), value: dataBrand }} />
 */}


			<Autocomplete transition="pop-top-left"
				transitionDuration={80}
				transitionTimingFunction="ease"
				size="lg"
				limit={10}
				placeholder="Enter Brand "
				data={brandData()}
				ref={query}
				itemComponent={forwardRef(({ id, value, ...others }, query) => {
					return (
						<div {...others} ref={query}>
							<Text>{value}</Text>
						</div>
					)
				})}
				onItemSubmit={(item) =>
					form.setFieldValue('brand_id', item.id)
				}


			/>
			<InputCurrency toParent={price} toParentTwo={currency} dataInput={{ value: dataPrice }} currency={dataCurrency} />
			<InputStoke toParent={stoke} value={dataStoke} max='' />
			<InputTextArea toParent={description} data={{ label: 'Description', placeholder: 'description', value: dataDescription }} />
			<InputText toParent={image} data={{ label: 'image', placeholder: 'image path', value: imageData }} radius='md' />
			<Group position="right" mt="md">
				<Button type="submit">Submit</Button>
			</Group>
		</form>
	)
}



