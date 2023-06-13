import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import imgUrl from '../Assets/image001.jpg';

const NavBarCustom = () => {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt="BrandLogo"
          src={imgUrl}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Eliy Lily
      </Navbar.Brand>
    </Container>
  </Navbar>
  );
}

export default NavBarCustom;