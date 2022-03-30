import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductOverview from './components/productOverview';
import NavbarComp from './components/NavbarComp'
/*   <NavBar/> */
function App() {
  return (
    <Container className="app" style={{ padding: " 10px 10px" }}>
      <Routes>
        <Route exact path='/' element={<ProductOverview />} />
        <Route exact path='/navbar' element={<NavbarComp />} />
      </Routes>
    </Container>
  );
}

export default App;
