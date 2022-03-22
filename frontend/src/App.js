import { Container } from 'react-bootstrap'
import { Routes , Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';

  /*   <NavBar/> */
function App() {
  return (
    <Container className="app" style={{padding: " 50px 50px"  }}>

        
           
            <Routes>
              <Route exact path='/' element={<Home />} />
            </Routes>
         
          </Container>
  );
}

export default App;
