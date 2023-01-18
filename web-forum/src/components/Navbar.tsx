import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navibar() {

    function handleBrand(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        window.location.href = "http://localhost:3001/forum";
    } 

    function handleLogout(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        localStorage.removeItem('jwt');
        window.location.href = "http://localhost:3001/";
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand onClick={handleBrand} href="#home">NUSCS Forum</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link> */}
                <NavDropdown title="Options" id="basic-nav-dropdown">
                <NavDropdown.Item>See your own posts</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                    Logout
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  );
}

export default Navibar;