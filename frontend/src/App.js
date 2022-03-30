import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductOverview from './components/productOverview';
<<<<<<< HEAD
import Home from './components/Home';
||||||| c21a1e1
=======
import NavbarComp from './components/NavbarComp'
>>>>>>> main
/*   <NavBar/> */
function App() {
  return (
    <Container className="app" style={{ padding: " 10px 10px" }}>
      <Routes>
<<<<<<< HEAD
        <Route exact path='/' element={<Home/>} />
||||||| c21a1e1
        <Route exact path='/' element={<ProductOverview />} />
=======
        <Route exact path='/' element={<ProductOverview />} />
        <Route exact path='/navbar' element={<NavbarComp />} />
>>>>>>> main
      </Routes>
    </Container>
  );
}

export default App;
