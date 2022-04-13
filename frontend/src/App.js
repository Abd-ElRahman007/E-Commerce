import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductOverview from './components/productOverview';
import Home from './components/Home';
import AdminOverview from './components/AdminOverview';
import NewCategory from './components/admin/NewCategory';
import NewBrand from './components/admin/NewBrand';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { Navbar } from './components/Navbar';
import EditStuff from './components/EditStuff';
import Cart from './components/user/Cart';
import TempCart from './components/TempCart';
import TempUser from './components/TempUser';
import Browse from './components/user/Browse';
import { authState } from './redux/slices/authSlice';
import { useSelector } from "react-redux"
import { HomeAdmin } from './components/admin/HomeAdmin';
import ProductThumb from './components/ProductThumb';
import { useEffect } from "react";


function App() {
  const { status } = useSelector(authState)
  useEffect(() => {
  }, [status])
  if (status === "admin")
    return (
      <Container className="app" style={{ padding: " 10px 10px" }}>
        <TempUser />
        <Routes>
          <Route exact path='/' element={<HomeAdmin />} />
          <Route exact path='/adminOverview' element={<AdminOverview />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/car' element={<Home />} />
        </Routes>
      </Container>
    )
  else if (status !== "admin")
    return (
      <Container className="app" style={{ padding: " 10px 10px" }}>
        <Navbar />
        <TempCart />
        <TempUser />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/overView' element={<ProductOverview />} />
          <Route exact path='/adminOverview' element={<AdminOverview />} />
          <Route exact path='/ProductOverview/:id' element={<ProductOverview />} />
          <Route exact path='/NewCategory' element={<NewCategory />} />
          <Route exact path='/NewBrand' element={<NewBrand />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/EditStuff' element={<EditStuff />} />
          <Route exact path='/Cart' element={<Cart />} />
          <Route exact path='/browse/:id' element={<Browse />} />
          <Route exact path='/ProductThumb/:id' element={<ProductThumb />} />
          <Route exact path='/AdminDashboard' element={<AdminDashboard />} />

        </Routes>
      </Container>
    );
}

export default App;
