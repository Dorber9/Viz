import React from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Container,
} from "react-bootstrap";

const navStyle= {color:"white" , marginLeft:"15px", fontSize:"20px", textDecoration: 'none'}
const selectedStyle={borderBottom: "1px solid #a3a3a4" , color: "rgb(137 134 255)",marginLeft:"15px", fontSize:"20px", textDecoration: 'none'}

const Header = () => {
  return (
    <Navbar style={{background:"#252626",boxShadow: "rgb(65 62 160) 0px 0px 5px",height:"30px"}} bg="dark" variant="dark">
        <Container>

          <Nav className="me-auto">
            <Nav.Link href="/" style={window.location.pathname=="/" ? selectedStyle: navStyle} >
              Home
            </Nav.Link>
            <Nav.Link  href="../offvsdef" style={window.location.pathname=="/offvsdef" ? selectedStyle :navStyle}>
              Offence VS Defence
            </Nav.Link>

            <Nav.Link href="../teamcompare" style={window.location.pathname=="/teamcompare" ? selectedStyle :navStyle}>
              Teams comparison
            </Nav.Link>
              <Nav.Link href="../aggvsrank" style={window.location.pathname=="/aggvsrank" ? selectedStyle :navStyle}>
              Aggressiveness vs Rank
            </Nav.Link>
              <Nav.Link href="../leagchamps" style={window.location.pathname=="/leagchamps" ? selectedStyle :navStyle}>
              League Champions
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar> 
  )
}

export default Header