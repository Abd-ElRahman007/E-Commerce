import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductOverview from './components/productOverview';
import Home from './components/Home';
import NavBar from './components/NavBar'

function App() {
  return (
    <Container className="app" style={{ padding: " 10px 10px" }}>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/ProductOverview' element={<ProductOverview />} />
      
      </Routes>
    </Container>
  );
}

export default App;
