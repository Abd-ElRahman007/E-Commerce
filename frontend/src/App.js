import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductOverview from './components/productOverview';
import Home from './components/Home';
import AdminOverview from './components/AdminOverview';
import NavBar from './components/NavBar'
/* import HomeAdmin from './components/admin/HomeAdmin';
import NewBrand from './components/admin/NewBrand ';
import NewCategory from './components/admin/NewCategory'; */

function App() {
  return (
    <Container className="app" style={{ padding: " 10px 10px" }}>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/overView' element={<ProductOverview />} />
        <Route exact path='/adminOverview' element={<AdminOverview />} />
        <Route exact path='/ProductOverview' element={<ProductOverview />} />
       {/*  <Route exact path='/homeAdmin' element={<HomeAdmin />} />
        <Route exact path='/newCategory' element={<NewCategory />} />
        <Route exact path='/newBrand' element={<NewBrand />} /> */}
      </Routes>
    </Container>
  );
}

export default App;
