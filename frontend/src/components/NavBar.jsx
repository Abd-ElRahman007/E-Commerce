import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import { User, ShoppingCart  } from 'tabler-icons-react';


const NavBar = () => {
    return (
        <div>
            <Navbar className='nav' bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <NavDropdown title="Categories" id="navbarScrollingDropdown" >
                        <NavDropdown.Item href="#action3"> Accessories</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Electrical Equipment</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                        Health & Medical
                        </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#action2" >
                            <User fontSize={'19'} className='me-1'/>
                            Sign In
                        </Nav.Link>
                        <Nav.Link href="#action2" >
                            <ShoppingCart fontSize={'23'}/>
                        </Nav.Link>

                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
       
    )
}

export default NavBar;