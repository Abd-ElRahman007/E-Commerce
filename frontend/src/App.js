import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductOverview from './components/productOverview';
import Home from './components/Home';
import AdminOverview from './components/AdminOverview';
import { HeaderMenu } from './components/NavBar'
import NewCategory from './components/admin/NewCategory';
import NewBrand from './components/admin/NewBrand';
import  {Login}  from './components/Login';
import {Car} from "./components/Car"
import {NewNav} from "./components/NewNav"
import Headerx from './components/Headerx';
import { NavNew } from './components/NavNew'
import EditStuff from './components/EditStuff';
import Cart from './components/user/Cart';
import TempCart from './components/TempCart';
import TempUser from './components/TempUser';
/* import HomeAdmin from './components/admin/HomeAdmin';
import NewBrand from './components/admin/NewBrand ';
import NewCategory from './components/admin/NewCategory'; */
import ByCategoryOrBrand from './components/user/ByCategoryOrBrand';
import { authState } from './redux/slices/authSlice';
import { useSelector } from "react-redux"
import { HomeAdmin } from './components/admin/HomeAdmin';



function App() {
  const {status} =useSelector(authState)
  if (status==="admin")
  return (
    <Container className="app" style={{ padding: " 10px 10px" }}>
      <TempUser />
     <Routes>
       
        <Route exact path='/' element={<HomeAdmin/>} />
        <Route exact path='/adminOverview' element={<AdminOverview/>} />
        <Route exact path='/car' element={<Home/>} />
     </Routes>
   </Container>
  )
 else 
  return (
    <Container className="app" style={{ padding: " 10px 10px" }}>
     {/*  <Headerx /> */}
     <NavNew />
     <TempCart/>
     <TempUser />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/overView' element={<ProductOverview/>} />
        <Route exact path='/adminOverview' element={<AdminOverview/>} />
        <Route exact path='/ProductOverview/:id' element={<ProductOverview/>} />
        <Route exact path='/NewCategory' element={<NewCategory />} />
        <Route exact path='/NewBrand' element={<NewBrand/>} />
        <Route exact path='/Login' element={<Login/>} />
        <Route exact path='/car' element={<Car/>} />
        <Route exact path='/NewNav' element={<NewNav/>} />
        <Route exact path='/Headerx' element={<Headerx/>} />
        <Route exact path='/navbar' element={<HeaderMenu/>} />
        <Route exact path='/NavNew' element={<NavNew/>} />
        <Route exact path='/EditStuff' element={<EditStuff/>} />
        <Route exact path='/Cart' element={<Cart/>} />
        <Route exact path='/bycategoryurbrand/:id' element={<ByCategoryOrBrand/>} />
       {/*  <Route exact path='/homeAdmin' element={<HomeAdmin />} />
        <Route exact path='/newCategory' element={<NewCategory />} />
        <Route exact path='/newBrand' element={<NewBrand />} /> */}
      </Routes>
    </Container>
  );
}

export default App;
