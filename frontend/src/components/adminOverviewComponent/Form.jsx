import { useForm } from '@mantine/form';
import InputCurrency from './InputCurrency';
import InputDropdown from './InputDropdown';
import InputStoke from './InputStoke';
import InputText from './InputText';
import InputTextArea from './InputTextArea';
import { Group, Button } from '@mantine/core';
import { useState ,useEffect} from 'react';
import axios from 'axios';

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
	const [imageData, setImageData] = useState('')

	const [exisitingCategories, setExisitingCategories] = useState([])
	const [existingBrands, setExistingBrands] = useState([])

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
	function image(childData) {
		setImageData(childData);
		form.setFieldValue('image', childData)
	}

	const getCategories =()=> {
	
		axios.get('http://localhost:5000/categories',)
		 .then((response) => {
			 console.log("backend response categoies" , response)
		 	setExisitingCategories(response.data) 
			 })
		 .catch(error =>console.log("backend error categoies" , error))
	}

	const getBrands =()=> {
	
		axios.get('http://localhost:5000/brands',)
		 .then((response) => {
			 console.log("backend response brands" , response)
		 	 setExistingBrands(response.data) 
			 })
		 .catch(error =>console.log("backend error brands" , error))
	}


	const backendCategories =()=> {
	 let current =[]
		exisitingCategories.map((c)=>{			
		  return current.push(c)
		})
		return current
	}

	const backendBrands =()=> {
		let current =[]
		   existingBrands.map((b)=>{			
			 return current.push(b)
		   })
		   return current
	   }


	   const handelSubmit = (e,values)=> {
		e.preventDefault(e)
		axios.post('http://localhost:5000/products', {data:values})
		.then((response) => {
			console.log("backend response brands" , response)
			 setExistingBrands(response.data) 
			}).
		catch(function(error){console.log(error)})
	}

	useEffect(() => {
		getCategories()
		console.log("categoies in backend " , exisitingCategories)

		getBrands()
		console.log("brands in backend " , existingBrands)
	}, [])

	return (
		<form onSubmit={form.onSubmit(handelSubmit)}>
			<InputText toParent={name} data={{ label: 'Product Name', placeholder: 'Product Name', value: dataName }} radius='md' />
			<InputText toParent={code} data={{ label: 'Product Code', placeholder: 'Product Code', value: dataCode }} radius='md' />
			<InputText toParent={model} data={{ label: 'Product Model', placeholder: 'Product Model', value: dataModel }} radius='md' />
			<InputDropdown toParent={category} data={{ label: 'Category', placeholder: 'category', data: backendCategories(), value: dataCategory }} />
			<InputDropdown toParent={brand} data={{ label: 'Brand', placeholder: 'Brand', data:backendBrands(), value: dataBrand }} />
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



