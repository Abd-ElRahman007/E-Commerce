import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductOverview from './components/productOverview';

/*   <NavBar/> */
function App() {
  return (
    <Container className="app" style={{ padding: " 10px 10px" }}>
      <Routes>
        <Route exact path='/' element={<ProductOverview />} />
      </Routes>
    </Container>
  );
}

export default App;
